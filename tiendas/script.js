
// Script para el boton de volver:
const volver = document.getElementById("botonVolver");

botonVolver.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../index.html";
    }
});
