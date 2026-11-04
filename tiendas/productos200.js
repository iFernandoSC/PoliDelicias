const parametros = new URLSearchParams(window.location.search);
const presupuesto = Number(parametros.get("presupuesto"));
const sql = "SELECT * FROM comida WHERE precio <= ?";
conexion.quer(sql, [presupuesto], (err, resultados) => {
  if (err){
    console.error(err);
    return;
  }
});
