const inputFoto = document.getElementById("foto");
const perfil = document.getElementById("perfil");
const presupuesto = document.getElementById("presupuesto");

let ultimaPosicion = 0;

window.addEventListener("scroll", () => {
    const posicionActual = window.scrollY;
    
    // Elementos
    const header = document.getElementById("header");
    const menu = document.getElementById("menu");

    // Lógica de dirección del scroll
    const scrollerHaciaAbajo = posicionActual > ultimaPosicion && posicionActual > 0;

    // Aplicar al Header
    if (header) {
        if (scrollerHaciaAbajo) {
            header.classList.add("oculto");
        } else {
            header.classList.remove("oculto");
        }
    }

    // Aplicar al Menú
    if (menu) {
        if (scrollerHaciaAbajo) {
            menu.classList.add("oculto");
        } else {
            menu.classList.remove("oculto");
        }
    }

    ultimaPosicion = posicionActual;
});

// 1. Función recomendar corregida para mandar el presupuesto en la URL
function recomendar() {
    let inputPres = document.getElementById("inputPres");
    if (!inputPres) return;
    
    let presupuestoVal = Number(inputPres.value);
    
    if (presupuestoVal <= 0 || isNaN(presupuestoVal)) {
        alert("Ingresa un presupuesto válido.");
        inputPres.focus();
        return;
    } else {
        // Redirige a la página de resultados pasando el presupuesto por la URL
        window.location.href = `tiendas/productos200.html?presupuesto=${presupuestoVal}`;
    }
}

// 2. Función que se ejecuta al cargar productos200.html para consultar la DB con el presupuesto
document.addEventListener("DOMContentLoaded", () => {
    const parametros = new URLSearchParams(window.location.search);
    const presupuestoUrl = Number(parametros.get("presupuesto"));

    // Si la URL no trae un presupuesto, no hacemos esta petición (evita errores en otras páginas)
    if (!presupuestoUrl || isNaN(presupuestoUrl)) return;

    const contenedorResultados = document.getElementById("resultadosPresupuesto"); // Asegúrate de tener este ID en tu HTML
    if (!contenedorResultados) return;

    contenedorResultados.innerHTML = "<p>Buscando opciones que alcancen con tu presupuesto...</p>";

    // Petición a tu backend en Render pasando el presupuesto filtrado por la base de datos
    fetch(`https://polidelicias-backend.onrender.com/api/comida?presupuesto=${presupuestoUrl}`)
        .then(response => {
            if (!response.ok) throw new Error(`Error en la petición: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("Opciones filtradas por presupuesto:", data);
            contenedorResultados.innerHTML = "";

            if (!data.comida || data.comida.length === 0) {
                contenedorResultados.innerHTML = `<p>No hay opciones disponibles por $${presupuestoUrl} o menos.</p>`;
                return;
            }

            data.comida.forEach(platillo => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta-platillo');
                tarjeta.innerHTML = `
                    <h3>${platillo.nombre_platillo || platillo.nombre}</h3>
                    <p>${platillo.descripcion || 'Sin descripción'}</p>
                    <span>$${platillo.precio}</span>
                `;
                contenedorResultados.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Error al obtener la comida por presupuesto:', error);
            contenedorResultados.innerHTML = "<p>Hubo un error al cargar las opciones.</p>";
        });
});

const pantalla = document.getElementById("pantalla-carga");

if (pantalla) {
    if (sessionStorage.getItem("yaEntro")) {
        pantalla.style.display = "none";
    } else {
        window.addEventListener("load", function() {
            setTimeout(function() {
                pantalla.classList.add("ocultar");
                sessionStorage.setItem("yaEntro", "true");
            }, 1000);
        });
    }
}

// Protegemos el evento de la foto
if (inputFoto) {
    inputFoto.addEventListener("change", function() {
        const archivo = inputFoto.files[0];
        if (archivo && perfil) {
            perfil.src = URL.createObjectURL(archivo);
        }
    });
}

// Protegemos el botón volver
const volver = document.getElementById("botonVolver");
if (volver) {
    volver.addEventListener("click", () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    });
}

function presu() {
    let inputPres = document.getElementById("inputPres");
    if (inputPres) inputPres.focus();
}

if (presupuesto) {
    presupuesto.addEventListener("click", presu);
}

// Funciones existentes de los lugares...
function comidachina() {
    const idLugar = 5; 
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) loadingDiv.style.display = 'block';

    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) throw new Error(`Error en la petición: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (loadingDiv) loadingDiv.style.display = 'none';
            const contenedorcoch = document.getElementById("OfertaComidaChina1");
            if (!contenedorcoch) return;      
            contenedorcoch.innerHTML = ''; 
            
            if (!data.comida || data.comida.length === 0) {
                contenedorcoch.innerHTML = '<p>No hay comida disponible para este lugar.</p>';
                return;
            }
            
            data.comida.forEach(platillo => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta-platillo');
                tarjeta.innerHTML = `
                    <h3>${platillo.nombre_platillo || platillo.nombre}</h3>
                    <p>${platillo.descripcion || 'Sin descripción'}</p>
                    <span>$${platillo.precio}</span>
                `;
                contenedorcoch.appendChild(tarjeta);
            });
        })
        .catch(error => {
            if (loadingDiv) loadingDiv.style.display = 'none';
            console.error('Error al obtener el menú de comida china:', error);
        });
}

function cooperativaa() {
    const idLugar = 1; 
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) loadingDiv.style.display = 'block';

    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) throw new Error(`Error en la petición: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (loadingDiv) loadingDiv.style.display = 'none';
            const contenedorcooa = document.getElementById("MenuCooperativa1");
            const contenedorcoopea = document.getElementById("MenuCooperativa2");

            if (!contenedorcooa) return;      
            if (contenedorcoopea) contenedorcoopea.innerHTML = '';
            contenedorcooa.innerHTML = ''; 
            
            if (data.comida && data.comida.length > 0 && contenedorcoopea) {
                data.comida.forEach(platillo => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${platillo.nombre_platillo}</h3>
                        <p>${platillo.descripcion || 'Sin descripción'}</p>
                        <span>$${platillo.precio}</span>
                    `;
                    contenedorcoopea.appendChild(tarjeta);
                });
            }
            
            if (data.bebidas && data.bebidas.length > 0) {
                data.bebidas.forEach(platillo => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${platillo.nombre_bebida}</h3>
                        <p>${platillo.descripcion || 'Sin descripción'}</p>
                        <span>$${platillo.precio}</span>
                    `;
                    contenedorcooa.appendChild(tarjeta);
                });
            }
        })
        .catch(error => {
            if (loadingDiv) loadingDiv.style.display = 'none';
            console.error('Error al obtener el menú de cooperativaa:', error);
        });
}

function banderilla() {
    const idLugar = 2; 
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) throw new Error(`Error en la petición: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const contenedorts = document.getElementById("MenuTortaSushi1");
            if (!contenedorts) return;      
            contenedorts.innerHTML = ''; 
            
            if (data.comida) {
                data.comida.forEach(platillo => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${platillo.nombre_platillo}</h3>
                        <p>${platillo.descripcion || 'Sin descripción'}</p>
                        <span>$${platillo.precio}</span>
                    `;
                    contenedorts.appendChild(tarjeta);
                });
            }
        })
        .catch(error => console.error('Error al obtener el menú de Tortas y Sushi:', error));
}

function GDnata() {
    const idLugar = 3; 
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) throw new Error(`Error en la petición: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const contenedorg = document.getElementById("MenuGorditasNata1");
            if (!contenedorg) return;      
            contenedorg.innerHTML = ''; 
            
            if (data.comida) {
                data.comida.forEach(platillo => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${platillo.nombre_platillo}</h3>
                        <p>${platillo.descripcion || 'Sin descripción'}</p>
                        <span>$${platillo.precio}</span>
                    `;
                    contenedorg.appendChild(tarjeta);
                });
            }
        })
        .catch(error => console.error('Error al obtener el menú de Gorditas:', error));
}

function laemocha() {
    const idLugar = 4; 
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) throw new Error(`Error en la petición: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const contenedor = document.getElementById("MenuRollitos1");
            if (!contenedor) return;      
            contenedor.innerHTML = ''; 
            
            if (data.comida) {
                data.comida.forEach(platillo => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${platillo.nombre_platillo}</h3>
                        <p>${platillo.descripcion || 'Sin descripción'}</p>
                        <span>$${platillo.precio}</span>
                    `;
                    contenedor.appendChild(tarjeta);
                });
            }
        })
        .catch(error => console.error('Error al obtener el menú de rollitos:', error));
}

// Ejecutamos las funciones de carga general
banderilla();
GDnata();
laemocha();
comidachina();
cooperativaa();

