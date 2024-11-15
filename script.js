import { auth, provider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.getElementById('loginModal');
  const profileIcon = document.getElementById('profileIcon');
  const closeModal = document.getElementById('closeModal');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  // Open modal
  profileIcon.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
  });

  // Close modal
  closeModal.addEventListener('click', () => {
    loginModal.classList.add('hidden');
  });

  // Switch tabs
  loginTab.addEventListener('click', () => {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  });

  signupTab.addEventListener('click', () => {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
  });

  // Firebase: Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Logged in successfully!');
        loginModal.classList.add('hidden');
      })
      .catch((error) => alert(error.message));
  });

  // Firebase: Signup
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Account created successfully!');
        loginModal.classList.add('hidden');
      })
      .catch((error) => alert(error.message));
  });
});
