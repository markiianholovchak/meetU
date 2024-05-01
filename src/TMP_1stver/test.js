// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBgwiVWylWV7fBaAQuXt-LaAzKUNoq_eI8",
  authDomain: "meetu-4db8d.firebaseapp.com",
  databaseURL: "https://meetu-4db8d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "meetu-4db8d",
  storageBucket: "meetu-4db8d.appspot.com",
  messagingSenderId: "727948666484",
  appId: "1:727948666484:web:f87f3dddfceec060b21321"

};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

// Register function using async/await for asynchronous operations
async function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const full_name = document.getElementById('full_name').value;

  if (!validateEmail(email) || !validatePassword(password)) {
    alert('Email or Password is invalid.');
    return;
  }
  if (!validateField(full_name)) {
    alert('Full name field is required.');
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const userData = {
      name: full_name,
      email: email,
      image: null,
      last_login: Date.now()
    };
    await setUserData(user.uid, userData);
    console.log('User registration successful.');
  } catch (error) {
    alert(error.message);
  }
}

// Login function using async/await
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!validateEmail(email) || !validatePassword(password)) {
    alert('Email or Password is invalid.');
    return;
  }

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const userData = {
      last_login: Date.now()
    };
    await updateUserData(user.uid, userData);
    console.log('User login successful.');
  } catch (error) {
    alert(error.message);
  }
}

// Data handling functions
async function setUserData(userUid, userData) {
  try {
    await database.ref('users/' + userUid).set(userData);
    console.log('Data saved successfully!');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

async function updateUserData(userUid, userData) {
  try {
    await database.ref('users/' + userUid).update(userData);
    console.log('Data updated successfully!');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

// Validation functions
function validateEmail(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateField(field) {
  return field != null && field.length > 0;
}
