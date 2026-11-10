const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db'); // Tu archivo de conexión a Alwaysdata

app.use(cors());

// Permite servir tus archivos estáticos (HTML, CSS, JS)
app.use(express.static(__dirname));

// Ruta existente para obtener el menú por ID de lugar
app.get('/api/info-id/:id', (req, res) => {
    const idLugar = req.params.id;

    const datosDelMenu = {};
    const consultarestaurante = 'SELECT * FROM restaurante WHERE id = ?';
    const consultacomida = 'SELECT * FROM comida WHERE id_lugar = ?';
    const consultabebidas = 'SELECT * FROM bebidas WHERE id_lugar = ?';
    const consultacomplemento = 'SELECT * FROM complementos WHERE id_lugar = ?';


    // 1. Buscamos primero los datos del restaurante
    db.query(consultarestaurante, [idLugar], (error, resultadoRestaurante) => {
        if (error) return res.status(500).send('Error en el servidor');
        datosDelMenu.restaurante = resultadoRestaurante[0] || {};

        // 2. Buscamos la comida
        db.query(consultacomida, [idLugar], (error, resultadosComida) => {
            if (error) return res.status(500).send('Error en el servidor');
            datosDelMenu.comida = resultadosComida;

            // 3. Buscamos las bebidas
            db.query(consultabebidas, [idLugar], (error, resultadosBebidas) => {
                if (error) return res.status(500).send('Error en el servidor');
                datosDelMenu.bebidas = resultadosBebidas;

                // 4. Buscamos los complementos
                db.query(consultacomplemento, [idLugar], (error, resultadosComplementos) => {
                    if (error) return res.status(500).send('Error en el servidor');
                    datosDelMenu.complementos = resultadosComplementos;

                    // ¡Mandamos todo empaquetado incluyendo el restaurante!
                    res.json(datosDelMenu);
                });
            });
        });
    });
});

// RUTA DE PRESUPUESTO: Con CAST para asegurar que compare correctamente los números
app.get('/api/comida', (req, res) => {
    const presupuesto = Number(req.query.presupuesto);

    if (!Number.isFinite(presupuesto) || presupuesto <= 0) {
        return res.status(400).json({
            error: 'Presupuesto inválido'
        });
    }

    db.query(
        'SELECT * FROM comida WHERE CAST(precio AS DECIMAL(10,2)) <= ?',
        [presupuesto],
        (error, resultados) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al consultar la comida'
                });
            }

            res.json({
                comida: resultados
            });
        }
    );
});

// NUEVA RUTA: Para obtener todos los restaurantes (con nombre, domicilio, latitud y longitud)
app.get('/api/restaurantes', (req, res) => {
    const consultaRestaurantes = 'SELECT * FROM restaurante';

    db.query(consultaRestaurantes, (error, resultadosRestaurantes) => {
        if (error) {
            console.error('Error al buscar restaurante:', error);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        res.json({
            restaurantes: resultadosRestaurantes
        });
    });
});

// Puerto dinámico para que funcione tanto en local como en Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
// RUTA DE PRESUPUESTO: Con JOIN para traer los datos del restaurante relacionado por id_lugar
app.get('/api/comida', (req, res) => {
    const presupuesto = Number(req.query.presupuesto);

    if (!Number.isFinite(presupuesto) || presupuesto <= 0) {
        return res.status(400).json({
            error: 'Presupuesto inválido'
        });
    }

    // Hacemos el JOIN con la tabla 'restaurante' usando el id_lugar
   const consultaPresupuesto = `
        SELECT 
            comida.*, 
            restaurante.nombre AS nombre_restaurante, 
            restaurante.domicilio, 
            restaurante.horario, 
            restaurante.latitud, 
            restaurante.longitud 
        FROM comida 
        JOIN restaurante ON comida.id_lugar = restaurante.id
        WHERE CAST(comida.precio AS DECIMAL(10,2)) <= ?
    `;

    db.query( consultaPresupuesto, [presupuesto], (error, resultados) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error al consultar la comida' });
            }
            res.json({  comida: resultados});
        });
});
