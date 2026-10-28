//O)OFERTAS M MENU 
const OCC = document.getElementById("OfertaComidaChina1");
const OCC2 = document.getElementById("OfertaComidaChina2");
const MCC = document.getElementById("MenuComidaChina1");
const MCC2 = document.getElementById("MenuComidaChina2");
const OCA = document.getElementById("OfertaCooperativaA1");
const OCA2 = document.getElementById("OfertaCooperativaA2");
const MCA = document.getElementById("MenuCooperativaA1");
const MCA2 = document.getElementById("MenuCooperativaA2");
const OCAN = document.getElementById("OfertaCooperativaCancha1");
const OCAN2 = document.getElementById("OfertaCooperativaCancha2");
const MCAN = document.getElementById("MenuCooperativaCancha1");
const MCAN2 = document.getElementById("MenuCooperativaCancha2");
const OGN = document.getElementById("OfertaGorditasNata1");
const OGN2 = document.getElementById("OfertaGorditasNata2");
const MGN = document.getElementById("MenuGorditasNata1");
const MGN2 = document.getElementById("MenuGorditasNata2");
const ORP = document.getElementById("OfertaRollitos1");
const ORP2 = document.getElementById("OfertaRollitos2");
const MRP = document.getElementById("MenuRollitos1");
const MRP2 = document.getElementById("MenuRollitos2");
const OTS = document.getElementById("OfertaTortaSushi1");
const OTS2 = document.getElementById("OfertaTortaSushi2");
const MTS = document.getElementById("MenuTortaSushi1");
const MTS2 = document.getElementById("MenuTortaSushi");
// Script para el boton de volver:
const volver = document.getElementById("botonVolver");

botonVolver.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../index.html";
    }
});
