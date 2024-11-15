document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('profileIcon');
    const dropdown = document.getElementById('profileDropdown');
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');

    // Simulated login state
    let isLoggedIn = false; // Set to true for logged-in state

    // Update profile UI based on login state
    if (isLoggedIn) {
        loginBtn.classList.add('hidden');
        profileBtn.classList.remove('hidden');
        profileIcon.src = 'assets/Profiles/user-profile.png'; // Replace with actual profile picture
    } else {
        loginBtn.classList.remove('hidden');
        profileBtn.classList.add('hidden');
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
});
