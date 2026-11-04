const parametros = new URLSearchParams(window.location.search);
const presupuesto = Number(parametros.get("presupuesto"));
fetch(/api/comida?presupuesto=${presupuesto})
.then(res => res.json())
.then(data => {
  console.log(data);
});
