const mysql= require('mysql2');
const { error } = require('node:console');
const conexion= mysql.createConnection({
    host: 'mysql-torres.alwaysdata.net',
    user: 'torres_visitante',
    password: 'pedritomata_bots',
    database: 'torres_polidelicias',
});
conexion.connect((err) =>{
  if (err) {
    console.error(' Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado exitosamente a la base de datos de PoliDelicias');
});
module.exports= conexion;