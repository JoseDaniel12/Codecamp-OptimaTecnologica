USE "db-codecamp-optimatecnologica";
GO

CREATE OR ALTER VIEW viewUsuario
AS
SELECT
    u.*,
    r.nombre AS rol,
    e.nombre AS estado
FROM usuarios AS u
LEFT JOIN rol AS r ON r.idrol = u.rol_idrol
LEFT JOIN estados AS e ON e.idestados = u.estados_idestados

GO

CREATE OR ALTER VIEW viewProducto
AS
SELECT
    p.*,
    cp.nombre AS categoria,
    e.nombre AS estado
FROM Productos AS p
LEFT JOIN CategoriaProductos AS cp ON p.CategoriaProductos_idCategoriaProductos = cp.idCategoriaProductos
LEFT JOIN estados AS e ON p.estados_idestados = e.idestados;

GO

CREATE OR ALTER VIEW viewOrden
AS
SELECT
    o.*,
    e.nombre AS estado
FROM Orden AS o
LEFT JOIN estados AS e ON o.estados_idestados = e.idestados;

GO

CREATE OR ALTER VIEW viewCategoriaProductos
AS
SELECT
    cp.*,
    e.nombre AS estado
FROM CategoriaProductos AS cp
LEFT JOIN estados AS e ON cp.estados_idestados = e.idestados;

