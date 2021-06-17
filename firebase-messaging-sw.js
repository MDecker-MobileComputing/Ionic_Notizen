// https://github.com/angular/angularfire/blob/master/docs/messaging/messaging.md#setting-up-the-firebase-messaging-service-worker

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyCmfcPnk-cVkLd6sUe4Zr1tpJtA9M_3lKE",
    authDomain: "notizen-mit-firestore.firebaseapp.com",
    projectId: "notizen-mit-firestore",
    storageBucket: "notizen-mit-firestore.appspot.com",
    messagingSenderId: "1004777408815",
    appId: "1:1004777408815:web:91d6644d2207869bd579da"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();