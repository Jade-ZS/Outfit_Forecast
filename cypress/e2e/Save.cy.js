describe('Save', () => {
  const key = Cypress.env('env').cypress_api_key
  beforeEach(() => {
    cy.visit('https://outfit-forecast.vercel.app')
  })

  it('should be able to save and unsave', () => {
    cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=NY&key=${key}`, {
      fixture: 'NYgeocode'
    }).as('getNYgeo')

    cy.intercept('https://api.openweathermap.org/data/2.5/weather?lat=40.7127753&lon=-74.0059728&units=metric&appid=f51a6bd94c6039cb545b8907194c688d', {
      fixture: 'NYweather'
    }).as('getNYweather')

    cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=Beijing&key=${key}`, {
      fixture: 'BeijingGeocode'
    }).as('getPKgeo')

    cy.intercept('https://api.openweathermap.org/data/2.5/weather?lat=39.904211&lon=116.407395&units=metric&appid=f51a6bd94c6039cb545b8907194c688d', {
      fixture: 'BeijingWeather'
    }).as('getPKweather')

    cy.intercept('https://api.openweathermap.org/data/2.5/weather?lat=40.7143&lon=-74.006&units=metric&appid=f51a6bd94c6039cb545b8907194c688d', {
      fixture: 'NYweather'
    }).as('getNYweatherDetails')

    cy.get('.search-input').type('NY')
    cy.get('input[type=submit]').click()
    cy.wait('@getNYgeo')
    cy.wait('@getNYweather')
    cy.get('.save-button').click()

    cy.get('.search-input').type('Beijing')
    cy.get('input[type=submit]').click()
    cy.wait('@getPKgeo')
    cy.wait('@getPKweather')
    cy.get('.save-button').click()

    cy.get('.view-saved-button').click()
    cy.url().should('includes', 'saved')
    cy.get('.saved-card').should('have.length', 2)

    cy.get('[href="/saved/New YorkUS"] > .city-name').click()
    cy.wait('@getNYweatherDetails')
    cy.url().should('includes', 'New%20YorkUS')
    cy.get('.home-button')
    cy.get('.result-card').within(() => {
      cy.get('.city')
      cy.get('.cloth-img')
      cy.get('.save-button').click()
      cy.get('.close-button').click()
    })

    cy.get('.saved-card').should('have.length', 1)
  })

  it('should see a message when there is no location saved', () => {
    cy.get('.view-saved-button').click()
    cy.url().should('includes', 'saved')
    cy.get('.home-button')
    cy.get('.empty-saves-message').contains('You haven\'t saved any location yet')
  })
})