const inputFoto = document.getElementById("foto");
const perfil = document.getElementById("perfil");
const presupuesto = document.getElementById("presupuesto");
function recomendar(){
    let presupuesto = Number(document.getElementById("inputPres").value);
    let alert = document.getElementById("alert");
    const inputPres = document.getElementById("inputPres");
    
    if (presupuesto <= 0  || isNaN(presupuesto)) {
        alert.textContent = "Ingresa un presupuesto valido.";
        alert.style.border = "2px solid red";
        alert.style.padding = "10px";
        inputPres.focus();
        return;
    } else if (presupuesto <= 50) {
        window.location.href = "tiendas/productos50.html";
    } else if (presupuesto <= 100) {
        window.location.href = "tiendas/productos100.html";
    } else {
        window.location.href = "tiendas/productos200.html";
    }
}
inputFoto.addEventListener("change",
    function() {
        const archivo = inputFoto.files[0];

        if (archivo) {
            perfil.src = URL.createObjectURL(archivo);
        }
    }
)
const volver = document.getElementById("botonVolver");
botonVolver.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
});
function presu() {
    inputPres.focus();
}
function comidachina() {
    const idLugar = 5; // 1 // fijo asignado a este restaurante
    // Pide al servidor únicamente la información de este id_lugar
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos de Comida China:", data);
            // Obtenemos el contenedor del HTML
            const contenedorcoch = document.getElementById("OfertaComidaChina1");
            if (!contenedorcoch) return; // Evita errores si el elemento no existe en la página          
            contenedorcoch.innerHTML = ''; // Limpiamos el contenedor antes de renderizar
            // Validamos si no hay platillos disponibles
            if (!data.comida || data.comida.length === 0) {
                contenedorcoch.innerHTML = '<p>No hay comida disponible para este lugar.</p>';
                return;
            }
            // Recorremos la lista de platillos que filtró la base de datos
            data.comida.forEach(platillo => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta-platillo');
                tarjeta.innerHTML = `
                    <h3>${platillo.nombre}</h3>
                    <p>${platillo.descripcion || 'Sin descripción'}</p>
                    <span>$${platillo.precio}</span>
                `;
                contenedorcoch.appendChild(tarjeta);
            }); // <-- Aquí se cierra correctamente el forEach
        })
        .catch(error => {
            console.error('Error al obtener el menú de comida china:', error);
        });
}
// Ejecutamos la función para que cargue los platillos al abrir la vista
comidachina();

presupuesto.addEventListener("click", presu);
