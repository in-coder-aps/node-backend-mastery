// public/js/app.js

// Utility: Show toast-like messages
function showMessage(msg) {
  alert(msg); // Simple alert; replace with toast lib if needed
}

// Signup form handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(signupForm);
    const payload = Object.fromEntries(formData);
    const response = await fetch('/person/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      showMessage('Signup successful!');
      window.location.href = '/profile.html';
    } else {
      showMessage(data.error || 'Signup failed.');
    }
  });
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const payload = Object.fromEntries(formData);

    const response = await fetch('/person/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      showMessage('Login successful!');
      window.location.href = '/profile.html';
    } else {
      showMessage(data.error || 'Login failed.');
    }
  });
}

// Profile fetch
if (window.location.pathname.includes('profile.html')) {
  const token = localStorage.getItem('token');
  fetch('/person/profile', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      const profileDiv = document.getElementById('profileData');
      if (data.user) {
        const user = data.user;
        profileDiv.innerHTML = `
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Role:</strong> ${user.work}</p>
          <p><strong>Email:</strong> ${user.email}</p>
        `;
      } else {
        profileDiv.innerText = 'Failed to load profile.';
      }
    });
}

// Fetch and display menu items
if (window.location.pathname.includes('menu.html')) {
  const token = localStorage.getItem('token');
  fetch('/menu', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((items) => {
      const container = document.getElementById('menuList');
      container.innerHTML = items.map(item => `
        <div>
          <strong>${item.name}</strong> - ₹${item.price} - ${item.taste || 'N/A'}
        </div>
      `).join('');
    });
}

// Add menu item form
const addMenuForm = document.getElementById('addMenuForm');
if (addMenuForm) {
  addMenuForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addMenuForm);
    const payload = Object.fromEntries(formData);
    if (payload.ingredients) {
      payload.ingredients = payload.ingredients.split(',').map(i => i.trim());
    }
    payload.is_drink = !!payload.is_drink;

    const token = localStorage.getItem('token');
    const response = await fetch('/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      showMessage('Item added!');
      window.location.href = '/menu.html';
    } else {
      showMessage(data.error || 'Failed to add item.');
    }
  });
}
