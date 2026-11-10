# ATKL RECORDS — OFFICIAL ACCESS (v2 · 3D)

Micrositio tipo Linktree **propio** de ATKL Records (sello discográfico + productora de eventos). Diseño original responsive con acceso a Bandcamp, Instagram, SoundCloud, Beatport y YouTube.

## Ver el sitio

**Vista rápida:** abre `index.html` en Chrome/Edge. Se mostrará el logo 3D con efecto de profundidad CSS, incluso sin internet.

**Vista 3D avanzada (Three.js + arrastre):** abre el directorio mediante un servidor local o publícalo. Por ejemplo, si tienes Python instalado, abre una terminal en la carpeta y ejecuta:

```sh
python -m http.server 8000
```

Entra a `http://localhost:8000`. Esta vista necesita internet para cargar Three.js desde jsDelivr. Si no hay conexión o WebGL, el efecto CSS queda activo automáticamente.

## Personalización

- `js/config.js`: edita los enlaces. Los cinco URLs actuales provienen de la versión anterior del micrositio; reconfirma que siguen siendo los oficiales antes de publicar.
- `featuredEvent`: actualmente es `null` para **no anunciar eventos, fechas ni entradas aún no confirmadas**. Cuando estén confirmados, agrega título, descripción y URL de venta siguiendo el ejemplo comentado. Se activará la tarjeta automáticamente.
- `assets/logo-atkl-original-blanco.png` y `assets/logo-atkl-original-negro.png`: copias **sin modificar** de los logos originales proporcionados.
- `assets/logo-atkl-white-trim.png`: versión que quita *solamente* los márgenes transparentes para mejorar el encuadre del efecto 3D. El dibujo del logo se conserva sin alteraciones.
- `style.css`: colores, movimiento, tarjetas y diseño.
- `js/three-logo.js`: volumen visual por múltiples planos de la silueta original; **no es un modelo volumétrico STL/GLB ni está pensado para impresión 3D**.

## Publicación

Sube todos los archivos de esta carpeta sin cambiar su estructura a **GitHub Pages**, **Cloudflare Pages** o cualquier hosting estático. Configura tu dominio o subdominio si cuentas con él. La web no requiere Linktree, cuentas de terceros para enlaces, backend, React ni bases de datos.

Para usar GitHub Pages en un repo tuyo: crea un repositorio, sube el contenido de esta carpeta a la raíz y selecciona `Settings > Pages > Deploy from a branch > main / (root)`.

## Referencia técnica

Se revisó https://github.com/heusser-dev/DmnD (React, Three.js, OrbitControls y partículas). Se **adaptó su enfoque técnico** de una escena interactiva, pero no se copiaron su modelo 3D, marca, música, CV ni textos. El repositorio inspeccionado no anuncia una licencia en su raíz, por lo que esta versión contiene código independiente y recursos exclusivos de ATKL. Se evitaron el reproductor con autoplay y las partículas pesadas para priorizar los accesos y la velocidad móvil.

## Antes de publicar

1. Confirmar que los 5 enlaces son correctos.
2. Confirmar un correo comercial, si deseas agregarlo. De momento, contacto lleva a Instagram.
3. Confirmar dominio/subdominio.
4. Verificar en un celular real y en un navegador de escritorio.

Este proyecto es un prototipo publicable, **no está desplegado ni conectado todavía a un dominio**.
"# ATKL-LINKS" 
