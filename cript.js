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

    // Animation on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    document.querySelectorAll('.container').forEach(container => {
        observer.observe(container);
    });

    // API integration to fetch data
    const apiUrl = 'https://google-data.p.rapidapi.com/email/airaudoeduardo@gmail.com'; // Actual API URL
    const apiKey = '97f8fbbd0emshbcc3d0c6a2a0971p1308c8jsn53aced019962'; // Your API Key

    const headers = {
        'x-rapidapi-host': 'google-data.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
    };

    // Fetch the data from the API
    fetch(apiUrl, { method: 'GET', headers: headers })
        .then(response => {
            console.log('Response status:', response.status);  // Log the response status (200, 404, etc.)
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();  // Parse the response as JSON if status is ok
        })
        .then(data => {
            console.log('API Response:', data);  // Log the data returned from the API

            // Assuming the API returns name, email, and image_url (update this based on your actual API response)
            const { name, email, image_url } = data;  // Modify this based on the actual structure of your API response

            // Display the information in the footer (or wherever needed)
            document.getElementById('api-content').innerHTML = `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <img src="${image_url}" alt="User Profile Image" style="width:100px;height:100px;border-radius:50%;"/>
            `;
        })
        .catch(error => {
            // Log the error and provide a fallback message
            console.error('Error fetching data:', error);
            document.getElementById('api-content').textContent = 'Unable to load user profile at this time.';
        });

    // Contact form submission
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

// Back to top button functionality
const backToTopButton = document.createElement('button');
backToTopButton.textContent = '↑';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Toggle mobile navigation menu
const navToggle = document.createElement('button');
navToggle.textContent = '☰';
navToggle.classList.add('nav-toggle');
document.querySelector('nav .container').prepend(navToggle);

navToggle.addEventListener('click', () => {
    document.querySelector('.nav-list').classList.toggle('active');
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = '🌙';
darkModeToggle.classList.add('dark-mode-toggle');
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Add animations to images
document.querySelectorAll('img').forEach(img => {
    img.classList.add('animated-image');
});

// Random background color for header
const header = document.querySelector('header');
header.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;

// Fade in animation on page load
document.body.classList.add('fade-in');
