document.addEventListener('DOMContentLoaded', (event) => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const message = document.getElementById('message').value;

        if (name && email && whatsapp && message) {
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert('Message sent successfully!');
            form.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Behance integration
    const behanceUsername = 'your_behance_username';
    const behanceApiKey = 'your_behance_api_key';
    const behanceUrl = `https://api.behance.net/v2/users/${behanceUsername}/projects?client_id=${behanceApiKey}`;

    fetch(behanceUrl)
        .then(response => response.json())
        .then(data => {
            const projects = data.projects.slice(0, 6); // Get first 6 projects
            const behanceContainer = document.getElementById('behance-projects');

            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('behance-project');
                projectElement.innerHTML = `
                    <img src="${project.covers.404}" alt="${project.name}">
                    <h3>${project.name}</h3>
                `;
                behanceContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error fetching Behance projects:', error));
});