document.getElementById('logoutBtn').addEventListener('click', logOut);

const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.href = 'index.html';
} else {
    displayUserInfo(user);
    fetchNotas(user.codigo);
}

function displayUserInfo(user) {
    document.getElementById('userCode').textContent = `Código: ${user.codigo}`;
    document.getElementById('userName').textContent = `Nombre: ${user.nombre}`;
}

function fetchNotas(codigo) {
    const endpoint = `https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students/${codigo}/notas`;

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                processNotasData(data);
            } else {
                throw new Error('Los datos recibidos no son válidos.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function processNotasData(data) {
    const notasTable = document.getElementById('notasTable');
    let totalCreditos = 0;
    let sumaProductos = 0;

    data.forEach(asignatura => {
        const { nombre, creditos, p1, p2, p3, ef } = asignatura;
        const definitiva = calcularDefinitiva(p1, p2, p3, ef);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${nombre}</td>
            <td>${creditos}</td>
            <td>${p1}</td>
            <td>${p2}</td>
            <td>${p3}</td>
            <td>${ef}</td>
            <td>${definitiva}</td>
        `;
        notasTable.appendChild(row);

        totalCreditos += creditos;
        sumaProductos += definitiva * creditos;
    });

    const promedioPonderado = calcularPromedioPonderado(sumaProductos, totalCreditos);
    document.getElementById('promedioPonderado').textContent = promedioPonderado.toFixed(2);
}

function calcularDefinitiva(p1, p2, p3, ef) {
    const promedioParciales = (p1 + p2 + p3) / 3;
    return promedioParciales * 0.7 + ef * 0.3;
}

function calcularPromedioPonderado(sumaProductos, totalCreditos) {
    return sumaProductos / totalCreditos;
}

function logOut() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}
