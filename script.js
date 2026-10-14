const inputFoto = document.getElementById("foto");
const perfil = document.getElementById("perfil");

function recomendar(){
    let presupuesto = Number(document.getElementById("inputPres").value);
    let alert = document.getElementById("alert");
    const inputPres = document.getElementById("inputPres");

    if (presupuesto <= 0  || isNaN(presupuesto)) {
        alert.textContent = "¡Ingresa un presupuesto valido!";
        inputPres.style.border = "2px solid red";
        inputPres.style.boxShadow = "0 0 10px red";
        inputPres.style.transform = "scale(1.1)";
        inputPres.style.transition = "ease .2s";
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

function regresar() {
    window.location.href = "index.html";
}

volver.addEventListener("click", regresar);
