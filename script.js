document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('profileIcon');
    const dropdown = document.getElementById('profileDropdown');
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const greetingMessage = document.getElementById('greetingMessage');
    const usernameSpan = document.getElementById('username');

    // Simulated login state
    let isLoggedIn = false; // Set to true for logged-in state
    const userProfile = {
        username: 'Michael', // Replace with dynamic username
        profilePic: 'assets/Profiles/user-profile.png' // Replace with actual path
    };

    // Update profile UI based on login state
    if (isLoggedIn) {
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        profileBtn.classList.remove('hidden');
        greetingMessage.classList.remove('hidden');
        usernameSpan.textContent = userProfile.username;
        profileIcon.src = userProfile.profilePic;
    } else {
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        profileBtn.classList.add('hidden');
        greetingMessage.classList.add('hidden');
        profileIcon.src = 'assets/Profiles/default-profile.png';
    }

    // Toggle dropdown on profile icon click
    profileIcon.addEventListener('click', () => {
        dropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileIcon.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        alert('You have been logged out!');
        location.reload();
    });
});
