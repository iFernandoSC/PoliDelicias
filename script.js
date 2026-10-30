const inputFoto = document.getElementById("foto");
const perfil = document.getElementById("perfil");
const presupuesto = document.getElementById("presupuesto");

function recomendar(){
    let inputPres = document.getElementById("inputPres");
    let alert = document.getElementById("alert");
    if (!inputPres) return;
    
    let presupuestoVal = Number(inputPres.value);
    
    if (presupuestoVal <= 0 || isNaN(presupuestoVal)) {
        alert.textContent = "Ingresa un presupuesto valido.";
        alert.style.border = "2px solid red";
        alert.style.padding = "10px";
        inputPres.focus();
        return;
    } else if (presupuestoVal <= 50) {
        window.location.href = "tiendas/productos50.html";
    } else if (presupuestoVal <= 100) {
        window.location.href = "tiendas/productos100.html";
    } else {
        window.location.href = "tiendas/productos200.html";
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
            window.location.href = "index.html";
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
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos de Comida China:", data);
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
                    <h3>${platillo.nombre_platillo}</h3>
                    <p>${platillo.descripcion || 'Sin descripción'}</p>
                    <span>$${platillo.precio}</span>
                `;
                contenedorcoch.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Error al obtener el menú de comida china:', error);
        });
}

function cooperativaa() {
    const idLugar = 1; 
    fetch(`https://polidelicias-backend.onrender.com/api/info-id/${idLugar}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos de Cooperativa a:", data);
            const contenedorcooa = document.getElementById("MenuCooperativa1");
            const contenedorcoopea = document.getElementById("MenuCooperativa2");

            if (!contenedorcooa) return;       
            contenedorcoopea.innerHTML='';
            contenedorcooa.innerHTML = ''; 
            if (!data.comida || data.comida.length === 0) {
                contenedorcoopea.innerHTML = '<p>No hay comida disponible para este lugar.</p>';
                return;
            }
            
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
            if (!data.bebidas || data.bebidas.length === 0) {
                contenedorcooa.innerHTML = '<p>No hay comida disponible para este lugar.</p>';
                return;
            }  
            data.bebidas.forEach(platillo => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta-platillo');
                tarjeta.innerHTML = `
                    <h3>${platillo.nombre_platillo}</h3>
                    <p>${platillo.descripcion || 'Sin descripción'}</p>
                    <span>$${platillo.precio}</span>
                `;
                contenedorcooa.appendChild(tarjeta);
            });
             if (!data.complementos || data.complementos.length === 0) {
                contenedorcooa.innerHTML = '<p>No hay comida disponible para este lugar.</p>';
                return;
            }  
            data.complementos.forEach(platillo => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta-platillo');
                tarjeta.innerHTML = `
                    <h3>${platillo.nombre_platillo}</h3>
                    <p>${platillo.descripcion || 'Sin descripción'}</p>
                    <span>$${platillo.precio}</span>
                `;
                contenedorcoch.appendChild(tarjeta);
            });
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
            console.log("Datos recibidos de Tortas y Sushi:", data);
            const contenedorts = document.getElementById("MenuTortaSushi1");
            if (!contenedorts) return;       
            
            contenedorts.innerHTML = ''; 
            
            // Validar si todo está vacío
            if ((!data.comida || data.comida.length === 0) && 
                (!data.bebidas || data.bebidas.length === 0) && 
                (!data.complementos || data.complementos.length === 0)) {
                contenedorts.innerHTML = '<p>No hay productos disponibles para este lugar.</p>';
                return;
            }
            
            // 1. Comida
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

            // 2. Bebidas
            if (data.bebidas && data.bebidas.length > 0) {
                data.bebidas.forEach(bebida => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${bebida.nombre_platillo}</h3>
                        <p>${bebida.descripcion || 'Sin descripción'}</p>
                        <span>$${bebida.precio}</span>
                    `;
                    contenedorts.appendChild(tarjeta);
                });
            }
            
            // 3. Complementos
            if (data.complementos && data.complementos.length > 0) {
                data.complementos.forEach(complemento => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${complemento.nombre_platillo}</h3>
                        <p>${complemento.descripcion || 'Sin descripción'}</p>
                        <span>$${complemento.precio}</span>
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
            console.log("Datos recibidos de Gorditas de Nata:", data);
            const contenedorg = document.getElementById("MenuGorditasNata1");
            if (!contenedorg) return;       
            
            contenedorg.innerHTML = ''; 
            
            if ((!data.comida || data.comida.length === 0) && 
                (!data.bebidas || data.bebidas.length === 0) && 
                (!data.complementos || data.complementos.length === 0)) {
                contenedorg.innerHTML = '<p>No hay productos disponibles para este lugar.</p>';
                return;
            }
            
            if (data.comida && data.comida.length > 0) {
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

            if (data.bebidas && data.bebidas.length > 0) {
                data.bebidas.forEach(bebida => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${bebida.nombre_platillo}</h3>
                        <p>${bebida.descripcion || 'Sin descripción'}</p>
                        <span>$${bebida.precio}</span>
                    `;
                    contenedorg.appendChild(tarjeta);
                });
            }
            
            if (data.complementos && data.complementos.length > 0) {
                data.complementos.forEach(complemento => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${complemento.nombre_platillo}</h3>
                        <p>${complemento.descripcion || 'Sin descripción'}</p>
                        <span>$${complemento.precio}</span>
                    `;
                    contenedorg.appendChild(tarjeta);
                });
            }
        })
        .catch(error => {
            console.error('Error al obtener el menú de Gorditas:', error);
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
            console.log("Datos recibidos de Rollitos:", data);
            const contenedor = document.getElementById("MenuRollitos1");
            if (!contenedor) return;       

            contenedor.innerHTML = ''; 
            
            if ((!data.comida || data.comida.length === 0) && 
                (!data.bebidas || data.bebidas.length === 0) && 
                (!data.complementos || data.complementos.length === 0)) {
                contenedor.innerHTML = '<p>No hay productos disponibles para este lugar.</p>';
                return;
            }
            
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

            if (data.bebidas && data.bebidas.length > 0) {
                data.bebidas.forEach(bebida => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${bebida.nombre_platillo}</h3>
                        <p>${bebida.descripcion || 'Sin descripción'}</p>
                        <span>$${bebida.precio}</span>
                    `;
                    contenedor.appendChild(tarjeta);
                });
            }
            
            if (data.complementos && data.complementos.length > 0) {
                data.complementos.forEach(complemento => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta-platillo');
                    tarjeta.innerHTML = `
                        <h3>${complemento.nombre_platillo}</h3>
                        <p>${complemento.descripcion || 'Sin descripción'}</p>
                        <span>$${complemento.precio}</span>
                    `;
                    contenedor.appendChild(tarjeta);
                });
            }
        })
        .catch(error => {
            console.error('Error al obtener el menú de rollitos:', error);
        });
}

// Ejecutamos la función
banderilla();
GDnata();
laemocha();
comidachina();
cooperativaa();


