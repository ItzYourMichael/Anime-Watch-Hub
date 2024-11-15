document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('profileIcon');
    const dropdown = document.getElementById('profileDropdown');
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');

    // Toggle dropdown visibility on profile icon click
    profileIcon.addEventListener('click', () => {
        dropdown.classList.toggle('hidden');
    });

    // Simulated login state
    let isLoggedIn = false; // Change this to true to simulate a logged-in user

    // Update dropdown based on login state
    if (isLoggedIn) {
        loginBtn.classList.add('hidden');
        profileBtn.classList.remove('hidden');
        profileIcon.src = 'images/user-profile.png'; // Replace with user profile picture
    } else {
        loginBtn.classList.remove('hidden');
        profileBtn.classList.add('hidden');
        profileIcon.src = 'images/default-profile.png';
    }

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileIcon.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
});
