const inputFoto = document.getElementById("foto");
const perfil = document.getElementById("perfil");
const volver = document.getElementById("botonVolver");

function regresar() {
    window.location.href = "index.html";
}

volver.addEventListener("click", regresar);

function recomendar(){
    let presupuesto = Number(document.getElementById("inputPres").value);
    let alert = document.getElementById("alert");

    if (presupuesto <= 0  || isNaN(presupuesto)) {
        alert.textContent = "¡Ingresa un presupuesto valido!";
        return;
    } else if (presupuesto <= 50) {
        window.location.href = "productos50.html";
    } else if (presupuesto <= 100) {
        window.location.href = "productos100.html";
    } else {
        window.location.href = "productos200.html";
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
