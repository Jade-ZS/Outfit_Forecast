describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=SF&key=${process.env.REACT_APP_API_KEY}`, {
      fixture: 'SFGeocode.json'
    }).as('getSFgeocode')

    cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=LA&key=${process.env.REACT_APP_API_KEY}`, {
      fixture: 'LAGeocode.json'
    }).as('getLAgeocode')

    cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=NY&key=${process.env.REACT_APP_API_KEY}`, {
      fixture: 'NYGeocode.json'
    }).as('getNYgeocode')

    cy.intercept(`https://maps.googleapis.com/maps/api/geocode/json?address=BeijingGkey=${process.env.REACT_APP_API_KEY}`, {
      fixture: 'BeijingGeocode.json'
    }).as('getBeijingGeocode')

    cy.intercept(`https://api.openweathermap.org/data/2.5/weather?lat=39.904211&lon=116.407395&appid=f51a6bd94c6039cb545b8907194c688d`, {
      fixture: 'BeijingWeather.json'
    }).as('getBeijingWeather')

    cy.intercept(`https://api.openweathermap.org/data/2.5/weather?lat=34.0522&lon=-118.2437&appid=f51a6bd94c6039cb545b8907194c688d`, {
      fixture: 'LAweather.json'
    }).as('getLAweather')

    cy.intercept(`https://api.openweathermap.org/data/2.5/weather?lat=40.7127753&lon=-74.0059728&appid=f51a6bd94c6039cb545b8907194c688d`, {
      fixture: 'NYweather.json'
    }).as('getNYweather')

    cy.intercept(`https://api.openweathermap.org/data/2.5/weather?lat=37.7749295&lon=-122.4194155&appid=f51a6bd94c6039cb545b8907194c688d`, {
      fixture: 'SFweather.json'
    }).as('getSFweather')

    cy.visit('https://outfit-forecast.vercel.app/result')
  })

  it('should visit the home page', () => {
    cy.get('input')
  })
})