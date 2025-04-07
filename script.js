function submitData() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const statusEl = document.getElementById('status');

    // Simple validation
    if (!name || !email) {
      statusEl.textContent = "Both fields are required!";
      statusEl.style.color = "red";
      return;
    }

    // Send data to API
    fetch('http://localhost:5000/api', { // Updated port
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })
    .then(res => res.json())
    .then(data => {
      statusEl.textContent = data.message;
      statusEl.style.color = "green";
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
    })
    .catch(err => {
      console.error(err);
      statusEl.textContent = "Submission failed!";
      statusEl.style.color = "red";
    });
  }