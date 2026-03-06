# Liga Ranked

Sitio web para mostrar la tabla de posiciones y enfrentamientos de la liga.

## Cómo actualizar resultados

Para cambiar resultados de partidos o puntos de equipos:

1. Ve al repositorio en GitHub.
2. Edita el archivo `datos.json`.
3. Cambia los valores en `enfrentamientos` (puntos1, puntos2) o `puntosEquipos`.
4. Haz commit y push.
5. El sitio se actualizará automáticamente en GitHub Pages.

## Estructura de datos.json

- `equipos`: Array de nombres de equipos.
- `enfrentamientos`: Array de objetos con equipo1, puntos1, equipo2, puntos2, fecha, estado.
- `puntosEquipos`: Objeto con equipo: puntos.

## Despliegue

Sube los archivos a un repositorio de GitHub y habilita GitHub Pages.