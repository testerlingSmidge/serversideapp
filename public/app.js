document.addEventListener('DOMContentLoaded', (event) => {
    const triggerGong = document.getElementById('triggerId');
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;

    triggerGong.addEventListener('click', () => {
        var targetId = document.getElementById('targetId');
        
        fetch('https://serversideapp-xi.vercel.app/trigger')
            .then(response => response.json())
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
