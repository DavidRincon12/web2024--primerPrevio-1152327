function login() {
    const codigo = document.getElementById('codigo').value;
    const clave = document.getElementById('clave').value;

    const data = {
        codigo: codigo,
        clave: clave
    };

    fetch('https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showErrorMessage(data.error);
            clearFields();
        } else {
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = 'notas.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage('Hubo un error al intentar iniciar sesión');
    });
}

function showErrorMessage(message) {
    document.getElementById('errorMessage').textContent = message;
}

function clearFields() {
    document.getElementById('codigo').value = '';
    document.getElementById('clave').value = '';
}

// Check if the user is already logged in
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    window.location.href = 'notas.html';
}