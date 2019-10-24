  import * as firebase from 'firebase'
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDc5ddzrNHKWRxJMVkEafPmX8qdOF9NWEA",
      authDomain: "gaby-commerce.firebaseapp.com",
      databaseURL: "https://gaby-commerce.firebaseio.com",
      projectId: "gaby-commerce",
      storageBucket: "gaby-commerce.appspot.com",
      messagingSenderId: "833486943952",
      appId: "1:833486943952:web:d860ee4a0785e1c11c90d5"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  export default firebase