# Analyze-This
Created a full-stack web application that parses strings for signs of mental illness. Results help provide support to the user. At the moment it detects signs of suicide, anger, and addiction. To analyze strings, I developed an algorithm that works with a large pool of words to find determinants of mental illness. Determinant words must be in a certain order to be flagged. Analysis results and Google Maps/Places API are used to find the nearest support facilities (rehab, support groups, etc.) and resources. The client was created with TypeScript React.js, the REST API with Python (Django), and data is stored in and queried from a Firestore (NoSQL) database. Deployed using Heroku.


## Available Scripts for Server


1. Type `pip install -r requirements.txt` in your terminal then press then "enter" key. This will install the required packages for this application to run.

2. The "mysite" outer-parent directory contains a python file called "manage.py" that starts the application. Access this 
outer-parent directory with your terminal. Then type the command `python manage.py runserver` and press the "enter" key. 
(In your terminal type `cd mysite` then press the "enter" key. Then type the command $ python manage.py runserver then press the "enter" key)

   
### Port: http://127.0.0.1:8000/

### Run command: In your terminal type `cd mysite` then press the "enter" key. Then type the command `python manage.py` runserver then press the "enter" key

### Install dependencies command: `pip install -r requirements.txt`

### Language: Python(Django)

### Database: Firestore


## Available Scripts For Client

In the project directory, you can run:

### `npm install`

Install all modules listed as dependencies in package.json.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

