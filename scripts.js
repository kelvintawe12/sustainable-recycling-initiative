document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://google-data.p.rapidapi.com/email/airaudoeduardo@gmail.com'; // MyAPI URL
    const apiKey = '97f8fbbd0emshbcc3d0c6a2a0971p1308c8jsn53aced019962'; // MyAPI Key
    
    const headers = {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
    };

    // Fetch Data using GET request
    function fetchData() {
        fetch(apiUrl, { method: 'GET', headers: headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const { name, email, image_url } = data;
                document.getElementById('api-content').innerHTML = `
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <img src="${image_url}" alt="User Profile Image" style="width:100px;height:100px;border-radius:50%;"/>
                `;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('api-content').textContent = 'Unable to load data at this time.';
            });
    }

    // POST Data using POST request
    function postData() {
        const postData = {
            name: 'James Smith',
            email: 'james@example.com'
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('POST response:', data);
            document.getElementById('api-content').textContent = 'Data submitted successfully!';
        })
        .catch(error => {
            console.error('Error submitting data:', error);
            document.getElementById('api-content').textContent = 'Unable to submit data.';
        });
    }

    // PUT Data using PUT request
    function updateData() {
        const updateData = {
            name: 'Jane Doe',
            email: 'janedoe@example.com'
        };

        fetch(apiUrl, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(updateData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('PUT response:', data);
            document.getElementById('api-content').textContent = 'Data updated successfully!';
        })
        .catch(error => {
            console.error('Error updating data:', error);
            document.getElementById('api-content').textContent = 'Unable to update data.';
        });
    }

    // Initial data fetch
    fetchData();

    // Form submission using POST request
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const formObj = {};
        formData.forEach((value, key) => {
            formObj[key] = value;
        });

        fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(formObj)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Form data submitted:', data);
            alert('Form submitted successfully!');
            form.reset();
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    });

    // Button event listeners for POST and PUT requests
    document.getElementById('post-button').addEventListener('click', postData);
    document.getElementById('put-button').addEventListener('click', updateData);
});