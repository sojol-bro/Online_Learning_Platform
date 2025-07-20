document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Registration successful');
      window.location.href = '/login.html';
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (err) {
    console.error(err);
    alert('Error registering');
  }
});
