document.addEventListener('DOMContentLoaded', function() {
  const clockInBtn = document.getElementById('clockInBtn');
  const clockOutBtn = document.getElementById('clockOutBtn');
  const nameInput = document.getElementById('nameInput');
  const statusDiv = document.getElementById('status');

  clockInBtn.addEventListener('click', function() {
      const name = nameInput.value;
      if(name) {
          sendData({ name, action: 'clock_in' });
      }
  });

  clockOutBtn.addEventListener('click', function() {
      const name = nameInput.value;
      if(name) {
          sendData({ name, action: 'clock_out' });
      }
  });

  function sendData(data) {
      fetch('/clocking', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
          statusDiv.textContent = data.message;
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }
});
