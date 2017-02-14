/* OSMOSIS */

SELECT nodes.tags->'name' as loc_name, users.name
FROM nodes, users
WHERE nodes.tags->'wheelchair' = 'yes' AND nodes.user_id = users.id
ORDER BY users.name ASC;

/* Selecionar qualquer valor de uma chave */
SELECT tags
FROM nodes
WHERE tags->'wheelchair' LIKE '%';


/* Quantas Tags Disabilities:wheelchair */
SELECT count(tags->'wheelchair')
FROM nodes;

/* Quantas Tags Disabilities:wheelchair:yes */
SELECT count(*)
FROM nodes
WHERE nodes.tags->'wheelchair' = 'yes';

/* Quantas Tags Disabilities:wheelchair:limited  */
SELECT count(*)
FROM nodes
WHERE nodes.tags->'wheelchair' = 'limited';


/* Quantas Tags Disabilities:wheelchair: designated */
SELECT count(*)
FROM nodes
WHERE nodes.tags->'wheelchair' = 'designated';


/* Quantas Tags Disabilities:wheelchair:no  */
SELECT count(*)
FROM nodes
WHERE nodes.tags->'wheelchair' = 'no';



/*  Distância entre pontos. */


/* Relações geométricas entre os pontos e o tipo de local (Rua, avenida e etc) */



/* Se os pontos estão pontos públicos ou privados. */
SELECT * 
FROM nodes
WHERE tags->'wheelchair' = 'yes' AND tags->'access' = 'public';

/* Tags que contém alguma descrição de acesso. */
SELECT * 
FROM nodes
WHERE tags ? 'access';

/* Quantos Contribuidores */
SELECT users.name, count(nodes.user_id)
FROM nodes, users
WHERE EXISTS (SELECT skeys FROM skeys(nodes.tags) WHERE skeys LIKE 'blind:description:%') AND nodes.user_id = users.id
GROUP BY users.name
ORDER BY users.name ASC;

/* OU */
SELECT users.name, count(nodes.user_id) AS contribs
FROM nodes, users
WHERE nodes.user_id = users.id AND tags ?| ARRAY['speech_out', 'speech_input', 'tactile_writing']
GROUP BY users.name
ORDER BY users.name ASC;

/* Geometry como GeoJSON */
SELECT ST_AsGeoJSON(nodes.geom)
FROM nodes
WHERE nodes.id = 1;

/*  Quantas Tags Disabilities */


/* Raio de atuação dos contribuidores */


/* OSM2PGSQL */

﻿SELECT point.osm_id, point.name,point.tags, point.sport
FROM planet_osm_point as point 
WHERE point.tags->'wheelchair'='yes' OR  point.tags->'wheelchair'='limited'
ORDER BY point.name;

SELECT *
FROM nodes
INNER JOIN way_nodes
ON nodes.id = way_nodes.node_id
WHERE nodes.tags -> 'wheelchair' = 'yes';