'use strict';

document.addEventListener("DOMContentLoaded", () => {
    // Verificamos que exista el contenedor del mapa en esta página
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Inicializamos el mapa
    const map = L.map('map', { center: [20.65936, -103.32838], zoom: 16, zoomControl: false });
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const coordBox = document.getElementById('coordBox');
    const btnLocate = document.getElementById('btnLocate');
    const geoStatus = document.getElementById('geoStatus');
    
    let userMarker = null;
    let accuracyCircle = null;
    let watchId = null;

    // 📍 CARGAR RESTAURANTES DESDE TU BACKEND (RENDER + ALWAYS DATA)
    fetch('https://polidelicias-backend.onrender.com/api/restaurantes')
        .then(res => res.json())
        .then(data => {
            const listaRestaurantes = data.restaurantes || data;
            
            if (!listaRestaurantes || listaRestaurantes.length === 0) return;

            listaRestaurantes.forEach(lugar => {
                if (lugar.latitud && lugar.longitud) {
                    const lat = parseFloat(lugar.latitud);
                    const lng = parseFloat(lugar.longitud);

                    L.marker([lat, lng])
                        .addTo(map)
                        .bindPopup(`
                            <div style="font-family: sans-serif; padding: 4px;">
                                <b style="font-size: 14px; color: #ea580c;">${lugar.nombre}</b><br>
                                <p style="margin: 4px 0; font-size: 12px; color: #333;">🍽️ <b>Tipo:</b> ${lugar.tipo_comida || 'General'}</p>
                                <p style="margin: 4px 0; font-size: 12px; color: #555;">📍 ${lugar.domicilio}</p>
                                <p style="margin: 4px 0; font-size: 11px; color: #666;">⏰ <b>Horario:</b> ${lugar.horario || 'No especificado'}</p>
                            </div>
                        `);
                }
            });
        })
        .catch(err => console.error('Error al conectar con la API de restaurantes:', err));

    // Actualizar coordenadas con el movimiento del cursor
    map.on('mousemove', (e) => {
        if (coordBox) {
            coordBox.textContent = `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
        }
    });

    function onLocationDetected(coords) {
        const pos = [coords.latitude, coords.longitude];
        if (!userMarker) {
            userMarker = L.marker(pos).addTo(map).bindPopup('📍 Mi ubicación actual').openPopup();
            accuracyCircle = L.circle(pos, { radius: coords.accuracy, color: '#ea580c', fillOpacity: 0.15, weight: 1.5 }).addTo(map);
            map.flyTo(pos, 16, { duration: 1.0 });
        } else {
            userMarker.setLatLng(pos);
            accuracyCircle.setLatLng(pos).setRadius(coords.accuracy);
        }
        if (coordBox) coordBox.textContent = `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`;
        if (geoStatus) geoStatus.textContent = `Lat: ${coords.latitude.toFixed(5)}, Lng: ${coords.longitude.toFixed(5)} (±${Math.round(coords.accuracy)} m)`;
    }

    function startTracking(highAccuracy = true, usedFallback = false) {
        if (!('geolocation' in navigator)) {
            if (geoStatus) geoStatus.textContent = 'Tu navegador no soporta geolocalización.';
            return;
        }
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
        if (btnLocate) btnLocate.textContent = 'Solicitando permiso GPS...';
        
        watchId = navigator.geolocation.watchPosition(
            (position) => {
                if (btnLocate) {
                    btnLocate.classList.add('active');
                    btnLocate.textContent = 'Rastreando ubicación (Detener)';
                }
                onLocationDetected(position.coords);
            },
            (err) => {
                if (highAccuracy && !usedFallback && (err.code === 2 || err.code === 3)) {
                    startTracking(false, true);
                    return;
                }
                stopTracking();
                const msgs = { 1: 'Permiso denegado.', 2: 'Señal no disponible.', 3: 'Tiempo agotado.' };
                if (geoStatus) geoStatus.textContent = msgs[err.code] || 'Error de ubicación.';
            },
            { enableHighAccuracy: highAccuracy, maximumAge: highAccuracy ? 2000 : 15000, timeout: highAccuracy ? 10000 : 20000 }
        );
    }

    function stopTracking() {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
        }
        if (btnLocate) {
            btnLocate.classList.remove('active');
            btnLocate.textContent = 'Usar mi ubicación';
        }
    }

    if (btnLocate) {
        btnLocate.addEventListener('click', () => {
            if (watchId !== null) {
                stopTracking();
                if (geoStatus) geoStatus.textContent = 'Rastreo detenido.';
            } else {
                startTracking(true, false);
            }
        });
    }
});
// --- 📍 LÓGICA PARA RECIBIR Y MOSTRAR EL PUNTO ESPECÍFICO DESDE LOS RESULTADOS ---
const parametrosMapa = new URLSearchParams(window.location.search);
const latParam = parametrosMapa.get('lat');
const lngParam = parametrosMapa.get('lng');
const nombreParam = parametrosMapa.get('nombre');

if (latParam && lngParam && typeof map !== 'undefined') {
    const lat = parseFloat(latParam);
    const lng = parseFloat(lngParam);
    
    // Centramos el mapa en el restaurante seleccionado con un zoom cercano
    map.setView([lat, lng], 17);

    // Opcional: Creamos y abrimos un marcador automático con el nombre del lugar
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`
            <div style="font-family: sans-serif; padding: 4px;">
                <b style="font-size: 14px; color: #ea580c;">${decodeURIComponent(nombreParam || 'Restaurante')}</b><br>
                <p style="margin: 4px 0; font-size: 12px; color: #333;">¡Aquí está la opción que seleccionaste!</p>
            </div>
        `)
        .openPopup();
}
