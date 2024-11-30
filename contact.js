document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // API integration to fetch a fact about waste management
    const apiUrl = 'https://google-data.p.rapidapi.com/email/airaudoeduardo@gmail.com'; // Your API URL
    const apiKey = 'your-api-key';  // Your API Key

    const headers = {
        'x-rapidapi-host': 'google-data.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
    };

    fetch(apiUrl, { method: 'GET', headers: headers })
        .then(response => response.json())
        .then(data => {
            const fact = data.fact;  // Adjust based on the actual response structure
            document.getElementById('api-content').textContent = fact;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('api-content').textContent = 'Unable to fetch fact.';
        });

    // Contact form submission (example)
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        fetch('submit_form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Form submitted successfully!');
            form.reset();
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    });
});
