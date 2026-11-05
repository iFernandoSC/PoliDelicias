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

document.addEventListener("DOMContentLoaded", () => {

    const contenedorResultados = document.getElementById("resultadosPresupuesto");

    if (!contenedorResultados) return;

    const parametros = new URLSearchParams(window.location.search);
    const presupuestoUrl = Number(parametros.get("presupuesto"));

    const monto = document.getElementById("montoPresupuesto");
    const monto2 = document.getElementById("montoPresupuesto2");

    if (!presupuestoUrl || isNaN(presupuestoUrl)) {
        contenedorResultados.innerHTML = "<p>No se especificó un presupuesto válido.</p>";
        return;
    }

    // Mostrar presupuesto en los dos elementos
    if (monto) monto.textContent = presupuestoUrl;
    if (monto2) monto2.textContent = presupuestoUrl;


    fetch(`https://polidelicias-backend.onrender.com/api/comida?presupuesto=${presupuestoUrl}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {

            contenedorResultados.innerHTML = "";

            if (!data.comida || data.comida.length === 0) {
                contenedorResultados.innerHTML = `<p>No hay opciones disponibles por $${presupuestoUrl} o menos.</p>`;
                return;
            }

            data.comida.forEach(platillo => {

                const tarjeta = document.createElement("article");
                tarjeta.classList.add("articulo");

                tarjeta.innerHTML = `
                    <h3>${platillo.nombre_platillo || platillo.nombre}</h3>
                    <p>${platillo.descripcion || "Sin descripción"}</p>
                    <span>$${platillo.precio}</span>
                `;

                contenedorResultados.appendChild(tarjeta);
            });

        })
        .catch(error => {
            console.error("Error al obtener la comida:", error);
            contenedorResultados.innerHTML = "<p>Hubo un error al cargar las opciones.</p>";
        });

});

// 1. Captura el input de presupuesto y redirige a la página de resultados
function recomendar() {

    const inputPres = document.getElementById("inputPres");

    if (!inputPres) return;

    const presupuestoVal = Number(inputPres.value);

    if (presupuestoVal <= 0 || isNaN(presupuestoVal)) {
        alert("Ingresa un presupuesto válido.");
        inputPres.focus();
        return;
    }

    window.location.href = `tiendas/productos200.html?presupuesto=${presupuestoVal}`;

}

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

// Protegemos el evento de la foto para que solo corra si el elemento existe
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
            window.location.href = "../index.html";
        }
    });
}

// Protegemos el evento de presupuesto
function presu() {
    let inputPres = document.getElementById("inputPres");
    if (inputPres) inputPres.focus();
}

if (presupuesto) {
    presupuesto.addEventListener("click", presu);
}


// Función de Comida China conectada a Render y Alwaysdata
function comidachina() {
    const idLugar = 5; 
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) loadingDiv.style.display = 'block';

    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
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
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (loadingDiv) loadingDiv.style.display = 'none';
            const contenedorcooa = document.getElementById("MenuCooperativa1");
            const contenedorcoopea = document.getElementById("MenuCooperativa2");

            if (!contenedorcooa) return;      
            if (contenedorcoopea) contenedorcoopea.innerHTML='';
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
            console.error('Error al obtener el menú de cooperativaa:', error);
        });
}

function banderilla() {
    const idLugar = 2; 
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const contenedorts = document.getElementById("MenuTortaSushi1");
            if (!contenedorts) return;      
            
            contenedorts.innerHTML = ''; 
            
            if (data.comida && data.comida.length > 0) {
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
        .catch(error => {
            console.error('Error al obtener el menú de Tortas y Sushi:', error);
        });
}

function GDnata() {
    const idLugar = 3;  
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const contenedorg = document.getElementById("OfertaGorditasNata1");
            if (!contenedorg) return;      
            
            contenedorg.innerHTML = '';  
            
            // Cambiamos data.comida por data.complementos porque ahí están guardadas las gorditas
            if (data.complementos && data.complementos.length > 0) {
                data.complementos.forEach(platillo => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${platillo.nombre}</h3>
                        <p>${platillo.descripcion || 'Sin descripción'}</p>
                        <span>$${platillo.precio}</span>
                    `;
                    contenedorg.appendChild(tarjeta);
                });
            } else {
                contenedorg.innerHTML = '<p>No hay gorditas disponibles para este lugar.</p>';
            }
        })
        .catch(error => {
            console.error('Error al obtener el menú de Gorditas:', error);
            const contenedorg = document.getElementById("OfertaGorditasNata1");
            if (contenedorg) contenedorg.innerHTML = '<p>Error al cargar el menú.</p>';
        });
}

function laemocha() {
    const idLugar = 4; 
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const contenedor = document.getElementById("MenuRollitos1");
            if (!contenedor) return;      

            contenedor.innerHTML = ''; 
            
            if (data.comida && data.comida.length > 0) {
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
        .catch(error => {
            console.error('Error al obtener el menú de rollitos:', error);
        });
}

// --- 🗺️ FUNCIÓN PARA CARGAR LOS RESTAURANTES EN EL MAPA ---
// --- 🗺️ FUNCIÓN PARA CARGAR LOS RESTAURANTES EN EL MAPA USANDO LA BD ---
function cargarRestaurantesMapa() {
    // Verificamos si existe el contenedor del mapa en la página actual para evitar errores
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Hacemos el fetch a tu backend para obtener todos los restaurantes con sus coordenadas
    fetch('https://polidelicias-backend.onrender.com/api/restaurantes')
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const listaRestaurantes = data.restaurantes || data;

            if (!listaRestaurantes || listaRestaurantes.length === 0) return;

            listaRestaurantes.forEach(lugar => {
                // Validamos que el restaurante tenga latitud y longitud guardadas
                if (lugar.latitud && lugar.longitud) {
                    const lat = parseFloat(lugar.latitud);
                    const lon = parseFloat(lugar.longitud);

                    // Verificamos que el objeto 'map' del mapa de Leaflet esté disponible
                    if (typeof map !== 'undefined' && map) {
                        L.marker([lat, lon])
                            .addTo(map)
                            .bindPopup(`
                                <div style="font-family: sans-serif; padding: 4px;">
                                    <b style="font-size: 14px; color: #ea580c;">${lugar.nombre}</b><br>
                                    <p style="margin: 4px 0; font-size: 12px; color: #333;">🍽️ <b>Tipo:</b> ${lugar.tipo_comida || 'General'}</p>
                                    <p style="margin: 4px 0; font-size: 12px; color: #555;">📍 ${lugar.domicilio}</p>
                                    <p style="margin: 4px 0; font-size: 11px; color: #666;">📞 <b>Contacto:</b> ${lugar.contacto || 'No registrado'}</p>
                                    <p style="margin: 4px 0; font-size: 11px; color: #666;">⏰ <b>Horario:</b> ${lugar.horario || 'No especificado'}</p>
                                </div>
                            `);
                    }
                }
            });
        })
        .catch(error => console.error('Error al obtener los restaurantes para el mapa:', error));
}

// Ejecutamos la función de los restaurantes en el mapa
cargarRestaurantesMapa();

// Ejecutamos las funciones de carga en las vistas que correspondan
banderilla();
GDnata();
laemocha();
comidachina();
cooperativaa();
