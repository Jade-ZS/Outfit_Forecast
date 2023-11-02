# Outfit Forecast

## Description

Outfit Forecast is a feature-rich web application built with React that empowers fashion-conscious travelers to plan their outfits wisely based on real-time weather forecasts. By seamlessly integrating Google Maps Geocode API and OpenWeather's Weather API, users can easily search for weather information in different locations and save preferred destinations for instant weather updates.

## Features

- **Real-Time Weather Forecasts:** Utilize the power of OpenWeather's Weather API to fetch accurate and up-to-date weather data for any desired location.

- **Location Search:** Users can conveniently search for weather information in various locations using Google Maps Geocode API, making trip planning a breeze.

- **Saved Locations:** Allow users to save and unsave preferred locations to receive instant weather updates without having to search repeatedly.

- **Responsive Design:** Outfit Forecast boasts a responsive user interface that adapts flawlessly to different devices, ensuring a seamless experience across smartphones, tablets, and desktops.

- **Error Handling:** Implemented an error handling page to provide users with a friendly interface in case of any unexpected issues.

- **Cypress Testing:** Comprehensive end-to-end testing with Cypress ensures app reliability and robustness.

## Preview

  ![feature preview](https://user-images.githubusercontent.com/123802263/270138196-d16cf89d-c27a-42bd-98a0-6cc6fe8be580.gif)

## Installation

To run the Outfit Forecast app locally on your machine, follow these steps:

1. Clone this repository to your local machine:

```
git clone git@github.com:Jade-ZS/Outfit_Forecast.git
```

2. Navigate to the project directory:

```
cd Outfit_Forecast
```

3. Install the required dependencies using npm:

```
npm install
```

4. Apply for API Keys:

   - Go to [Google Cloud Console](https://console.cloud.google.com/), create a new project (if you don't have one), enable the Google Maps Geocode API, and get your API key.

5. Configure API Keys:

   - In the project root directory, create a `.env` file and add the following lines:

   ```
   REACT_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```

6. Start the development server:

```bash
npm start
```

7. Open your web browser and navigate to `http://localhost:3000` to access the app.

## Testing
To run Cypress end-to-end tests for the app, follow these steps:

1. In a new terminal window, navigate to the project directory.

2. Create a `cypress.env.json` file in your root directory and add the following lines:
```
{
  "env": {
    "cypress_api_key" : "Your_Api_Keys_Here"
  }
}
```
3. Run the Cypress tests:
```
npm run cypress
```

4. Cypress will launch. Choose `E2E Test` and `Chrome`.  Cypress will display a list of available tests. Click on a test to run it in the browser.

## Future Plans

As part of future development, I plan to create a backend app to support personalized clothing recommendations based on different weather conditions. I haven't been able to find a fashion API with free access. The backend app will allow users to receive customized weather based cloth recommendations to make their travel experience even more delightful.

