describe('Home Page', () => {
  beforeEach(() => {

    // cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=NY&key=${process.env.REACT_APP_API_KEY}`, {
    //   fixture: 'NYGeocode.json'
    // }).as('getNYgeocode')

    // cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=BeijingGkey=${process.env.REACT_APP_API_KEY}`, {
    //   fixture: 'BeijingGeocode.json'
    // }).as('getBeijingGeocode')

    // cy.intercept(`https://api.openweathermap.org/data/2.5/weather?lat=39.904211&lon=116.407395&appid=f51a6bd94c6039cb545b8907194c688d`, {
    //   fixture: 'BeijingWeather.json'
    // }).as('getBeijingWeather')

    // cy.intercept(`https://api.openweathermap.org/data/2.5/weather?lat=40.7127753&lon=-74.0059728&appid=f51a6bd94c6039cb545b8907194c688d`, {
    //   fixture: 'NYweather.json'
    // }).as('getNYweather')

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
    cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=SF&key=AIzaSyB8w7Qq-8kROMbGAPCjdfp2SiY4cAyYXdw`, {
        fixture: 'SFGeocode.json'
    }).as('getSFgeo')

    cy.intercept(`https://api.openweathermap.org/data/2.5/weather?lat=37.7749295&lon=-122.4194155&units=metric&appid=f51a6bd94c6039cb545b8907194c688d`, {
      fixture: 'SFweather.json'
    }).as('getSFweather')

    cy.intercept('https://maps.googleapis.com/maps/api/geocode/json?address=LA&key=AIzaSyB8w7Qq-8kROMbGAPCjdfp2SiY4cAyYXdw', {
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
})