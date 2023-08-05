describe('Home Page', () => {
  const key = Cypress.env('env').cypress_api_key
  beforeEach(() => {
    cy.visit('https://outfit-forecast.vercel.app')
  })

  it('should visit the home page', () => {
    cy.get('.view-saved-button')
    cy.get('.search-input')
    cy.get('[href="/result"] > input')
    cy.get('.welcome')
      .within(() => {
        cy.get('.welcome-rabbits')
        cy.get('p')
      })
  })

  it('should be able to search', () => {
    cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=SF&key=${key}`, {
        fixture: 'SFGeocode.json'
    }).as('getSFgeo')

    cy.intercept(`https://api.openweathermap.org/data/2.5/weather?lat=37.7749295&lon=-122.4194155&units=metric&appid=f51a6bd94c6039cb545b8907194c688d`, {
      fixture: 'SFweather.json'
    }).as('getSFweather')

    cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=LA&key=${key}`, {
      fixture: 'LAgeocode.json'
    }).as('getLAgeo')

    cy.intercept('https://api.openweathermap.org/data/2.5/weather?lat=34.0522342&lon=-118.2436849&units=metric&appid=f51a6bd94c6039cb545b8907194c688d', {
      fixture: 'LAweather.json'
    }).as('getLAweather')

    cy.get('.search-input').type('LA')
    cy.get('input[type=submit]').click()
    cy.wait('@getLAgeo')
    cy.wait('@getLAweather')
    cy.get('.result-container').within(() => {
      cy.get('.cloth-img')
      cy.get('.weather-card')
      cy.get('.save-button')
    })
    cy.get('.weather-card').within(() => {
      cy.get('.city-icon').should('have.attr', 'src').should('eq','https://openweathermap.org/img/wn/01d@2x.png')
      cy.contains('span', 'Los Angeles')
      cy.get('.city-temp').contains('301')
      cy.get('sup').contains('°C')
      cy.get('p').contains('clear sky')
    })

    cy.get('.search-input').type('SF')
    cy.get('input[type=submit]').click()
    cy.wait('@getSFgeo')
    cy.wait('@getSFweather')
    cy.get('.result-container').within(() => {
      cy.get('.cloth-img')
      cy.get('.weather-card')
      cy.get('.save-button')
    })
    cy.get('.weather-card').within(() => {
      cy.get('.city-icon').should('have.attr', 'src').should('eq','https://openweathermap.org/img/wn/04d@2x.png')
      cy.contains('span', 'San Francisco')
      cy.get('.city-temp').contains('290')
      cy.get('sup').contains('°C')
      cy.get('p').contains('overcast clouds')
    })
  })

  it('should be alerted when search input is invalid', () => {
    cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=jjjjjj&key=${key}`, {
      body: {
        "results": [],
        "status": "ZERO_RESULTS"
      }
    }).as('getBadInput')
    cy.get('input[type=submit]').click()
    cy.get('.alert-box').within(() => {
      cy.get('.content')
    })
    cy.get('button').click()

    cy.get('.search-input').type('jjjjjj')
    cy.get('input[type=submit]').click()
    cy.wait('@getBadInput')
    cy.get('.alert-box').within(() => {
      cy.get('.content')
    })
    cy.get('button').click()
  })
})