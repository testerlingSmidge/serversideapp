document.addEventListener('DOMContentLoaded', (event) => {
    const triggerGong = document.getElementById('triggerId');
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;

    triggerGong.addEventListener('click', () => {
        fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: 500000 }) // Set value to 500000 for testing
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log(`Updated targetId to ${data.targetIdValue} with uniqueId ${data.uniqueId}`);
                // Reload the page to reflect the updated targetId value
                location.reload();
            } else {
                console.error('Failed to update targetId:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    modeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
    });
});
