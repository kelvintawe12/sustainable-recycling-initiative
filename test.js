document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links (existing code)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fetch Waste Management Statistics
    const apiUrl = 'https://google-data.p.rapidapi.com/email/airaudoeduardo@gmail.com'; // MyAPI URL
    const apiKey = '97f8fbbd0emshbcc3d0c6a2a0971p1308c8jsn53aced019962'; // MyAPI Key

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${wasteStatsApiKey}`,
    };

    // Fetch waste management statistics
    fetch(wasteStatsUrl, { method: 'GET', headers: headers })
        .then(response => {
            console.log('Response status:', response.status);  // Log the response status
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();  // Parse the response as JSON if status is ok
        })
        .then(data => {
            console.log('API Response:', data);  // Log the data returned from the API

            // Assuming the API returns key waste statistics such as waste generation and recycling rates
            const { totalWasteGenerated, recycledWaste, recyclingRate } = data; // Modify this based on the actual structure of your API response

            // Display the statistics in the footer or in a section for waste management
            document.getElementById('waste-management-stats').innerHTML = `
                <h3>Waste Management Statistics</h3>
                <p><strong>Total Waste Generated:</strong> ${totalWasteGenerated} tons</p>
                <p><strong>Recycled Waste:</strong> ${recycledWaste} tons</p>
                <p><strong>Recycling Rate:</strong> ${recyclingRate}%</p>
            `;
        })
        .catch(error => {
            // Log the error and provide a fallback message
            console.error('Error fetching waste statistics:', error);
            document.getElementById('waste-management-stats').textContent = 'Unable to load waste statistics at this time.';
        });

    // Your other code remains here...

    // Back to top button functionality (existing code)
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

    // Dark mode toggle (existing code)
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Add animations to images (existing code)
    document.querySelectorAll('img').forEach(img => {
        img.classList.add('animated-image');
    });

    // Random background color for header (existing code)
    const header = document.querySelector('header');
    header.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;

    // Fade in animation on page load (existing code)
    document.body.classList.add('fade-in');
});
