function recomendar(){
    let presupuesto = Number(document.getElementById("inputPres").value);

    if (presupuesto <= 50) {
        window.location.href = "productos50.html";
    } else if (presupuesto <= 100) {
        window.location.href = "productos100.html";
    } else {
        window.location.href = "productos200.html";
    }
}

