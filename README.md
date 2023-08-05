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

![Outfit Forecast App Preview](link_to_your_app_preview.gif)

## Deployment

The Outfit Forecast app is deployed using Vercel and is accessible at [https://vercel.com/jade-zs/outfit-forecast](https://vercel.com/jade-zs/outfit-forecast).

## Installation

To run the Outfit Forecast app locally on your machine, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone git@github.com:Jade-ZS/Outfit_Forecast.git
```

2. Navigate to the project directory:

```bash
cd Outfit_Forecast
```

3. Install the required dependencies using npm:

```bash
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

## Future Plans

As part of future development, I plan to create a backend app to support personalized clothing recommendations based on different weather conditions. I haven't been able to find a fashion API with free access. The backend app will allow users to receive customized weather based cloth recommendations to make their travel experience even more delightful.

