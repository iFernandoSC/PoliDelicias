const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db'); // Tu archivo de conexión a Alwaysdata

app.use(cors());

// Permite servir tus archivos estáticos (HTML, CSS, JS)
app.use(express.static(__dirnamconst express = require('express');
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
    const consultacomida = 'SELECT * FROM comida WHERE id_lugar = ?';
    const consultabebidas = 'SELECT * FROM bebidas WHERE id_lugar = ?';
    const consultacomplemento = 'SELECT * FROM complementos WHERE id_lugar = ?';

    db.query(consultacomida, [idLugar], (error, resultadosComida) => {
        if (error) {
            console.error('Error al buscar comida:', error);
            return res.status(500).send('Error en el servidor');
        }
        datosDelMenu.comida = resultadosComida;

        db.query(consultabebidas, [idLugar], (error, resultadosBebidas) => {
            if (error) {
                console.error('Error al buscar bebidas:', error);
                return res.status(500).send('Error en el servidor');
            }
            datosDelMenu.bebidas = resultadosBebidas;

            db.query(consultacomplemento, [idLugar], (error, resultadosComplementos) => {
                if (error) {
                    console.error('Error al buscar complementos:', error);
                    return res.status(500).send('Error en el servidor');
                }
                datosDelMenu.complementos = resultadosComplementos;

                res.json(datosDelMenu);
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
            console.error('Error al buscar restaurantes:', error);
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
