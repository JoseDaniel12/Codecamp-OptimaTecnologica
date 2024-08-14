USE "db-codecamp-optimatecnologica";

-- Consulta A:
CREATE VIEW ConsultaA AS
SELECT
    COUNT(*) AS totalProductosActiovs
FROM Productos
WHERE stock > 0;


-- Consulta B:
CREATE VIEW ConsultaB AS
SELECT
    SUM(total_orden) AS total
FROM Orden
WHERE MONTH(fecha_creacion) = 8 AND YEAR(fecha_creacion) = 2024;

-- Consulta C:
CREATE VIEW ConsultaC AS
SELECT
    u.*,
    consumo_usuarios.monto_consumo
FROM (
    SELECT TOP 10
        u.idusuarios,
        SUM(o.total_orden) AS monto_consumo
    FROM usuarios AS u
    INNER JOIN  Orden AS o ON u.idusuarios = o.usuarios_idusuarios
    GROUP BY u.idusuarios
    ORDER BY monto_consumo DESC
) AS consumo_usuarios
INNER JOIN usuarios AS u ON consumo_usuarios.idusuarios = u.idusuarios;


-- Consulta D:
CREATE VIEW ConsultaD AS
SELECT
    p.*,
    venta_productos.cant_vendida
FROM (
    SELECT TOP 10
        p.idProductos,
        SUM(od.cantidad) AS cant_vendida
    FROM OrdenDetalles AS od
    INNER JOIN Productos AS p ON od.Productos_idProductos = p.idProductos
    GROUP BY p.idProductos
    ORDER BY cant_vendida ASC

) AS venta_productos
INNER JOIN Productos AS p ON venta_productos.idProductos = p.idProductos;