document.addEventListener('DOMContentLoaded', (event) => {
    const triggerGong = document.getElementById('triggerId');
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;

    triggerGong.addEventListener('click', () => {
        console.log('Button clicked'); // Log button click
        triggerGong.disabled = true; // Disable the button to prevent multiple clicks

        fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: 500000 }) // Set value to 500000 for testing
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                console.log(`Updated targetId to ${data.targetIdValue} with uniqueId ${data.uniqueId}`);
                location.reload(); // Reload the page to reflect the updated targetId value
            } else {
                console.error('Failed to update targetId:', data.message);
                triggerGong.disabled = false; // Re-enable the button in case of failure
            }
        })
        .catch(error => {
            console.error('Error:', error);
            triggerGong.disabled = false; // Re-enable the button in case of error
        });
    });

    modeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
    });
});
