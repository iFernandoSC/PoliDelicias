<?php
header('Content-Type: application/json');
// Aquí va tu conexión a la base de datos (db.js / conexión real)
include 'conexion.php'; 

$sql = "SELECT nombre, domicilio, tipo_comida, horario FROM restaurante";
$resultado = $conn->query($sql);

$restaurantes = [];
if ($resultado->num_rows > 0) {
    while($row = $resultado->fetch_assoc()) {
        $restaurantes[] = $row;
    }
}

echo json_encode($restaurantes);
?>
