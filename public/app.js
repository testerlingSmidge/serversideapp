document.addEventListener('DOMContentLoaded', (event) => {
    const triggerGong = document.getElementById('triggerId');
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;

    triggerGong.addEventListener('click', () => {
        var targetId = document.getElementById('targetId');
        
        // Ensure the fetch URL is correct
        fetch('/api/trigger')
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
