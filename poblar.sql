-- sqlite3 db.sqlite3 < poblar.sql
DELETE FROM categoria_categoria;
DELETE FROM almacen_producto;
INSERT INTO categoria_categoria (id, nombre, descripcion, imagen, slug) 
VALUES 
(1, 'AUDIO', 'Descripcion AUDIO', '', 'audio'),
(2, 'BAJOS', 'Descripcion BAJO', '', 'bajo'),
(3, 'BATERÍAS Y PERCUSIÓN', 'Descripcion BATERÍAS Y PERCUSIÓN', '', 'baterias-y-percusion'),
(4, 'GUITARRAS', 'Descripcion GUITARRAS', '', 'guitarras'),
(5, 'TECLAS', 'Descripcion TECLAS', '', 'teclas'),
(6, 'UKELELES Y OTRAS CUERDAS', 'Descripcion UKELELES Y OTRAS CUERDAS', '', 'ukeleles-y-otras-cuerdas'),
(7, 'VIENTOS', 'Descripcion VIENTOS', '', 'vientos');
-- (id, '', 'Descripcion ', '', 'slug')
INSERT INTO almacen_producto (id, nombre, slug, descripcion, precio, imagen, stock, is_available, fecha_creacion, fecha_modificacion, categoria_id)
VALUES
(1, 'Interfaz Esi U22Xt Set Si, Set ', 'interfaz-esi-u-22-xt-set-si-set', 'Set es un potente paquete de grabación de estudio U22 XT Ofrece una flexibilidad como dispositivo USB alimentado por una calidad de audio profesional impecable de 24 bits, proporcionando todo lo que necesita para realizar grabaciones de calidad profesional con su PC o Mac.'||char(10)||char(10)||'La interfaz cuenta con 2 canales de entrada analógica y 2 salidas analógica con entrada de línea RCA. un preamplificador de micrófono con entrada XLR y soporte para alimentación fantasma de + 48V, 1 entrada de instrumento Hi-Z para guitarra, una salida de auriculares de alta calidad y salidas de línea TRS. El volumen principal y de los auriculares, así como la monitorización, se controlan en el panel frontal.'||char(10)||char(10)||'En el lado del software, U22 XT proporciona controladores de baja latencia con soporte para WDM, ASIO 2.0 y CoreAudio basados en nuestra tecnología EWDM y DirectWIRE.'||char(10)||char(10)||'El set está compuesto pot: cosMik 10 Micrófono de condensador, eXtra 10 Auriculares de estudio, Interfaz de audio U22XT, Bitwig Studio 8 pistas DAW, Software para DJ Deckadance LE v2 y Software de Mezcla/Procesamiento Audified inTone 2 ESI Edition.', 259990, 'photos/productos/254118-1200-auto.png', 49, 1, DATE('now'), DATE('now'), 1),
(2, 'Greg Bennett Bajo 4 Cuerdas Fairlane', 'greg-bennett-bajo-4-cuerdas-fairlane', 'El Fairlane FN-4 bajo guitarra incorpora un cuerpo caoba y arce Mástil construcción para ofrecer un tono resonante, cálido y rico. Más pesado en peso que el tilo o ceniza, la caoba es una madera densa que se suma a los graves y ayudar a baja respuesta medio para producir un tono más grueso y redondeado. El Mástil es una rápida madera de arce que produce dinámica brillante y un ataque de la nota rápida. Con dos potentes solo bobina pastilla de estilo Jazz el Fairlane FN-4 ofrece una respuesta dinámica, suave y potente en el puente y un tono más cálido, más gordo en el Mástil. Bajo pickups de bobina simple utilizan una sola bobina envuelta alrededor del imán para crear un tono brillante y claro y pueden ser mezclados con los controles de volumen individual.', 0, 'photos/productos/190236-1200-auto.png', 0, 1, DATE('now'), DATE('now'), 2);
-- (id, 'nombre', 'slug', 'descripcion', precio, 'photos/productos/nombre.png', stock, 1, DATE('now'), DATE('now'), categoria_id)