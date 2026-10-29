const express = require('express');
const app = express();
const db = require('./db'); // O como tengas tu conexión

// 1. ¡MUY IMPORTANTE! Esto permite que Express sirva tus HTML, CSS e imágenes
app.use(express.static(__dirname));

app.get('/api/info-id/:id', (req, res) => {
    const idLugar = req.params.id;
    
    // Declaramos el objeto donde guardaremos todo el menú para este lugar
    const datosDelMenu = {};
    const consultacomida = 'SELECT * FROM comida WHERE id_lugar = ?';
    const consultabebidas = 'SELECT * FROM bebidas WHERE id_lugar = ?';
    const consultacomplemento = 'SELECT * FROM complementos WHERE id_lugar = ?';

    // 1. Buscamos la comida de ese id_lugar
    db.query(consultacomida, [idLugar], (error, resultadosComida) => {
        if (error) {
            console.error('Error al buscar comida:', error);
            return res.status(500).send('Error en el servidor');
        }
        datosDelMenu.comida = resultadosComida;

        // 2. Buscamos las bebidas de ese id_lugar
        db.query(consultabebidas, [idLugar], (error, resultadosBebidas) => {
            if (error) {
                console.error('Error al buscar bebidas:', error);
                return res.status(500).send('Error en el servidor');
            }
            datosDelMenu.bebidas = resultadosBebidas;

            // 3. Buscamos los complementos de ese id_lugar
            db.query(consultacomplemento, [idLugar], (error, resultadosComplementos) => {
                if (error) {
                    console.error('Error al buscar complementos:', error);
                    return res.status(500).send('Error en el servidor');
                }
                datosDelMenu.complementos = resultadosComplementos;

                // ¡Listo! Mandamos todo en formato JSON
                res.json(datosDelMenu);
            });
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
    console.log('Conectado exitosamente a la base de datos de PoliDelicias');
});