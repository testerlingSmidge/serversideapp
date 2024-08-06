document.addEventListener('DOMContentLoaded', (event) => {
    const triggerGong = document.getElementById('triggerId');
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;

    triggerGong.addEventListener('click', () => {
        fetch('/api/trigger')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.open();
                document.write(data);
                document.close();
            })
            .catch(error => console.error('Error:', error));
    });

    modeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
    });
});
