const inputFoto = document.getElementById("foto");
const perfil = document.getElementById("perfil");
const presupuesto = document.getElementById("presupuesto");

let ultimaPosicion = 0;

// Efecto de scroll para header y menú
window.addEventListener("scroll", () => {
    const posicionActual = window.scrollY;

    const header = document.getElementById("header");
    const menu = document.getElementById("menu");

    const scrollerHaciaAbajo = posicionActual > ultimaPosicion && posicionActual > 0;

    if (header) {
        if (scrollerHaciaAbajo) {
            header.classList.add("oculto");
        } else {
            header.classList.remove("oculto");
        }
    }

    if (menu) {
        if (scrollerHaciaAbajo) {
            menu.classList.add("oculto");
        } else {
            menu.classList.remove("oculto");
        }
    }

    ultimaPosicion = posicionActual;
});

document.querySelectorAll("footer").forEach(footer => {
    footer.innerHTML = `
        <p>© 2026 PoliDelicias</p>
        <p>soportepolidelicias777@gmail.com</p>
    `;
});

// Captura el input de presupuesto y redirige
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

// Pantalla de carga inicial
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

// Evento de la foto de perfil
if (inputFoto) {
    inputFoto.addEventListener("change", function() {
        const archivo = inputFoto.files[0];
        if (archivo && perfil) {
            perfil.src = URL.createObjectURL(archivo);
        }
    });
}

// Botón volver
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

function presu() {
    let inputPres = document.getElementById("inputPres");
    if (inputPres) inputPres.focus();
}

if (presupuesto) {
    presupuesto.addEventListener("click", presu);
}

// --- FUNCIONES DE LOS MENÚS POR LUGAR ---
function comidachina() {
    const idLugar = 5;  
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) loadingDiv.style.display = 'block';

    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status}`);
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
            console.error('Error al obtener comida china:', error);
        });
}

function cooperativaa() {
    const idLugar = 1;  
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) loadingDiv.style.display = 'block';

    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status}`);
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
        .catch(error => console.error('Error en cooperativa:', error));
}

function banderilla() {
    const idLugar = 2;  
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => response.json())
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
        .catch(error => console.error('Error en banderilla:', error));
}

function GDnata() {
    const idLugar = 3;  
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => response.json())
        .then(data => {
            const contenedorg = document.getElementById("OfertaGorditasNata1");
            if (!contenedorg) return;      
            contenedorg.innerHTML = '';  

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
                contenedorg.innerHTML = '<p>No hay gorditas disponibles.</p>';
            }
        })
        .catch(error => console.error('Error en GDnata:', error));
}

function laemocha() {
    const idLugar = 4;  
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => response.json())
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
        .catch(error => console.error('Error en laemocha:', error));
}

// Carga de restaurantes en el mapa general
function cargarRestaurantesMapa() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    fetch('https://polidelicias-backend.onrender.com/api/restaurantes')
        .then(response => response.json())
        .then(data => {
            const listaRestaurantes = data.restaurantes || data;
            if (!listaRestaurantes || listaRestaurantes.length === 0) return;

            listaRestaurantes.forEach(lugar => {
                if (lugar.latitud && lugar.longitud) {
                    const lat = parseFloat(lugar.latitud);
                    const lon = parseFloat(lugar.longitud);

                    if (typeof map !== 'undefined' && map) {
                        L.marker([lat, lon])
                            .addTo(map)
                            .bindPopup(`
                                <div style="font-family: sans-serif; padding: 4px;">
                                    <b style="font-size: 14px; color: #ea580c;">${lugar.nombre}</b><br>
                                    <p style="margin: 4px 0; font-size: 12px; color: #333;">🍽️ <b>Tipo:</b> ${lugar.tipo_comida || 'General'}</p>
                                    <p style="margin: 4px 0; font-size: 12px; color: #555;">📍 ${lugar.domicilio}</p>
                                    <p style="margin: 4px 0; font-size: 11px; color: #666;">⏰ <b>Horario:</b> ${lugar.horario || 'No especificado'}</p>
                                </div>
                            `);
                    }
                }
            });
        })
        .catch(error => console.error('Error en mapa:', error));
}

// Ejecuciones globales iniciales
cargarRestaurantesMapa();
banderilla();
GDnata();
laemocha();
comidachina();
cooperativaa();


// --- BLOQUE ÚNICO Y UNIFICADO DE DOMContentLoaded PARA EL PRESUPUESTO ---
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

    if (monto) monto.textContent = presupuestoUrl;
    if (monto2) monto2.textContent = presupuestoUrl;

    fetch(`https://polidelicias-backend.onrender.com/api/comida?presupuesto=${presupuestoUrl}`)
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status}`);
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
                tarjeta.style.cursor = "pointer";

                const nombrePlatillo = platillo.nombre_platillo || platillo.nombre;
                const nombreRestaurante = platillo.nombre_restaurante || platillo.restaurante || platillo.nombre_lugar || 'Polidelicias';
                const domicilio = platillo.domicilio || platillo.direccion || 'Dirección no especificada';
                const horario = platillo.horario || platillo.hora || 'Horario no especificado';
                
                const lat = platillo.latitud || platillo.lat;
                const lng = platillo.longitud || platillo.lng;

                tarjeta.innerHTML = `
                    <h3>${nombrePlatillo}</h3>
                    <p>${platillo.descripcion || "Sin descripción"}</p>
                    <span class= "precio">$${platillo.precio}</span>
                    
                    <div class="detalles-ampliados" style="display: none; margin-top: 15px; padding-top: 10px; border-top: 1px solid #ddd;">
                        <p style="margin: 4px 0; font-size: 13px; color: white !important;">📍 <b>Restaurante:</b> ${nombreRestaurante}</p>
                        <p style="margin: 4px 0; font-size: 13px; color: white !important;">🏠 <b>Dirección:</b> ${domicilio}</p>
                        <p style="margin: 4px 0; font-size: 13px; color: white !important;">⏰ <b>Horario:</b> ${horario}</p>

                        <a href="../mapa.html${lat && lng ? `?lat=${lat}&lng=${lng}&nombre=${encodeURIComponent(nombreRestaurante)}` : ''}" class="btn-ir-mapa" style="display: inline-block; margin-top: 10px; background-color: #ea580c; color: white; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; text-decoration: none;">
                            Ir al mapa / Ver ubicación
                        </a>
                    </div>
                `;

                // Evento para desplegar o contraer los detalles al hacer clic
                tarjeta.addEventListener("click", (e) => {
                    if (e.target.tagName === 'A') return;

                    const detalles = tarjeta.querySelector(".detalles-ampliados");
                    if (detalles.style.display === "none") {
                        detalles.style.display = "block";
                    } else {
                        detalles.style.display = "none";
                    }
                });

                contenedorResultados.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error("Error al obtener la comida:", error);
            contenedorResultados.innerHTML = "<p>Hubo un error al cargar las opciones.</p>";
        });
});
