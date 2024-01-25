## <p align="center">Weather98 - Retro-styled Weather App</p>

<div align="center">

[![React](https://img.shields.io/badge/React-17.x-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-2.x-success)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)](https://www.typescriptlang.org/)
[![Axios](https://img.shields.io/badge/Axios-0.21.x-blue)](https://axios-http.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-2.x-blueviolet)](https://tailwindcss.com/)
[![Lodash](https://img.shields.io/badge/Lodash-4.x-success)](https://lodash.com/)
[![Howler](https://img.shields.io/badge/Howler-2.x-orange)](https://howlerjs.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.x-yellowgreen)](https://recharts.org/)
[![dotenv](https://img.shields.io/badge/dotenv-10.x-lightgrey)](https://www.npmjs.com/package/dotenv)

</div>

![Weather98 Screenshot](https://i.ibb.co/QYXR5pQ/weather98.png)

Welcome to Weather98, a stylish weather application inspired by the Windows 98 aesthetic.

## Technologies Used

- React + Vite
- TypeScript
- Axios
- Tailwind CSS
- Lodash
- Howler
- Recharts
- dotenv

## Assumptions

Before proceeding, ensure you have the following:

- Node.js and yarn installed on your machine.

## Download and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jotace-br/weather98.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather98
   ```

3. Install dependencies:

   ```bash
   yarn install # or your preferred package manager like npm, pnpm or bun
   ```

4. Create a new `.env` file and add your openweatherapi key:

   > [!IMPORTANT]
   > Make sure your key has access to onecall 3.0, otherwise this code won't fetch the weather data.

   ```bash
   VITE_API_KEY='your_awesome_key'
   VITE_API_URL='https://api.openweathermap.org/data/3.0'
   ```

## Running the Application

4. Start the development server:

   ```bash
   yarn dev
   ```

   This will launch the application locally. Open your browser and visit `http://localhost:5173` to view Weather98.

## Process and Choices

Weather98 was developed with the following considerations:

1. **User Interface**: The application incorporates the iconic Windows 98 UI for a nostalgic user experience.

2. **Technologies**:

   - **React + Vite**:

     - **React**: A popular JavaScript library for building user interfaces. It allows you to create reusable UI components and manage the state of your application efficiently.
     - **Vite**: A fast build tool for modern web development. It's particularly well-suited for React projects, providing a quick development server and optimized production builds.

   - **TypeScript**:

     - A superset of JavaScript that adds static typing to the language. TypeScript helps catch errors during development, improves code readability, and provides better tooling support.

   - **Axios**:

     - A promise-based HTTP client for making HTTP requests. Axios simplifies the process of sending requests and handling responses in web applications.

   - **Tailwind CSS**:

     - A utility-first CSS framework that simplifies the process of styling your application. Tailwind CSS provides a set of pre-defined utility classes that you can use to style HTML elements without writing custom CSS.

   - **Lodash**:

     - A utility library for JavaScript that provides helpful functions for common programming tasks. It includes functions for working with arrays, objects, and other data structures, improving code readability and reducing the need for custom implementations.

   - **Howler**:

     - A JavaScript library for working with audio in the browser. Howler simplifies tasks like loading, playing, and controlling audio, making it easier to integrate sound into your web application.

   - **Recharts**:

     - A charting library for React applications. Recharts makes it easy to create interactive and responsive charts using components, helping you visualize data in a meaningful way.

   - **dotenv**:
     - A zero-dependency module that loads environment variables from a `.env` file into the `process.env` object. This is useful for configuring your application based on different environments (development, production, etc.) without exposing sensitive information in your codebase.

3. **Styling**: The retro styling is achieved using custom CSS to mimic the classic Windows 98 look.

4. **Weather Data**: Weather98 fetches weather information from the OpenWeatherAPI using the One Call API 3.0. The application utilizes the following OpenWeatherAPI services:

   - **One Call API 3.0**: Provides current weather data, minute forecast, hourly forecast, and daily forecast.
   - **Geocode API**: Enables geocoding functionality to convert location names into geographic coordinates.

   To use this functionality, you'll need to obtain an API key from [OpenWeatherAPI](https://openweathermap.org/api) and configure it in your application, typically by using a `.env` file.

   ```env
   VITE_API_KEY=your_api_key_here
   ```

Make sure to create a `.env` file in the root of your project and add the following:

5. **Responsive Design**: The app is designed to be responsive, ensuring a seamless experience across various devices.

Feel free to explore and contribute to the project. If you encounter any issues or have suggestions, please open an issue or submit a pull request.

### <p align="center">Enjoy the retro vibes with Weather98!<p>
