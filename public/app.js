document.addEventListener('DOMContentLoaded', (event) => {
    const triggerGong = document.getElementById('triggerId');
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;

    triggerGong.addEventListener('click', () => {
        var targetId = document.getElementById('targetId');
        
        // Update fetch URL if your server is running on a different URL
        fetch('https://serversideapp-xi.vercel.app/trigger')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === "triggered") {
                    targetId.innerHTML = data.value;
                }
            })
            .catch(error => console.error('Error:', error));
    });

    modeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
    });
});
