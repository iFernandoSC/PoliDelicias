function recomendar(){
    let presupuesto = Number(document.getElementById("inputPres").value);
    let alert = document.getElementById("alert");

    if (presupuesto <= 0  || isNaN(presupuesto)) {
        alert.textContent = "Ingresa un presupuesto valido";
        return;
    } else if (presupuesto <= 50) {
        window.location.href = "productos50.html";
    } else if (presupuesto <= 100) {
        window.location.href = "productos100.html";
    } else {
        window.location.href = "productos200.html";
    }
}

