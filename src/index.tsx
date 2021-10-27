import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgMwl85sMUg-KaJhjiU7gd-HjVAz69tV4",
  authDomain: "tranquil-journey-341e7.firebaseapp.com",
  databaseURL: "https://tranquil-journey-341e7-default-rtdb.firebaseio.com",
  projectId: "tranquil-journey-341e7",
  storageBucket: "tranquil-journey-341e7.appspot.com",
  messagingSenderId: "795132584659",
  appId: "1:795132584659:web:0d04eca8e988b983816a26",
  measurementId: "G-48VS7CGV5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
