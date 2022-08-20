# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# About the Project

This is a defense project for the ReactJS course at SoftUni.

Interconn is an application aimed at helping people find other like-minded people and do activities they enjoy together. 

The application is similar to a blog system - users can create publications is specific categories. Other users can then view them and interact with them via comments.

Logged-in users have admin rights (edit and delete) over their own posts.

The application connects to an external weather API to display the weather conditions for the following 5 days. It uses a number of external libraries that help by providing compoonents or ease stilization.

# Architecture
The project is divided into separate components with their own .css files. 

Reset.css data can be found directly in `index.css`. Box-sizing approach is border-box. 

The application uses (nested) routing provided by `react-router-dom`. 

There is one main context provider from 'React' which stores user data and (publications for future needs) globally.

All logic related to CRUD operations, including preliminary data validation (to check if the request was successful) is stored in `src/services/api`. The `api.js` file contains all low-level logic related to server requests and handling and the `data.js` file contains high-level logic for all requests, adapted to the needs of each component.

# Installing Dependencies

The current repository already includes a node_modules folder with everything necessary. To manually install all necessary dependencies run the following in the console `in the main directory` and in `/src`: 

### `npm i`

# Enabling to the Back End Service 

The project uses the SoftUni Practice Server. 

The server data can be found in `src/server/server.js` in the main directory. The server contains preloaded data. 

To run the server you need to run the following command in Command Prompt/ Powershell from the directory/folder of the `server.js` file: 

### `node server.js` 

Open [http://localhost:3030/admin](http://localhost:3030/admin) to view the admin panel and all static and dynamically stored data.

The Softuni Practice Server supports CRUD operations, Authentication, and specific requests with query strings. Full documentation on the SoftUni Practice Server can be found here: [https://github.com/softuni-practice-server/softuni-practice-server](https://github.com/softuni-practice-server/softuni-practice-server)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
