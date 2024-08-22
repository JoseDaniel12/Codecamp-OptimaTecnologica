USE "db-codecamp-optimatecnologica";
GO

CREATE OR ALTER PROCEDURE ObtenerProductos
AS
BEGIN
    SELECT * FROM productos;
END;

GO

CREATE OR ALTER PROCEDURE ObtenerProductoPorId
    @idProductos INT
AS
BEGIN
    SELECT * FROM productos WHERE idProductos = @idProductos;
END;

GO

CREATE OR ALTER PROCEDURE CrearProducto
    @CategoriaProductos_idCategoriaProductos INT,
    @usuarios_idusuarios INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @estados_idestados INT,
    @precio FLOAT,
    @foto VARBINARY(MAX)
AS
BEGIN
    INSERT INTO Productos (
        CategoriaProductos_idCategoriaProductos,
        usuarios_idusuarios,
        nombre,
        marca,
        codigo,
        stock,
        estados_idestados,
        precio,
        foto
    ) VALUES (
        @CategoriaProductos_idCategoriaProductos,
        @usuarios_idusuarios,
        @nombre,
        @marca,
        @codigo,
        @stock,
        @estados_idestados,
        @precio,
        @foto
    );

    SELECT * FROM Productos WHERE idProductos = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE ActualizarProducto
    @idProductos INT,
    @CategoriaProductos_idCategoriaProductos INT,
    @usuarios_idusuarios INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @estados_idestados INT,
    @precio FLOAT,
    @foto VARBINARY(MAX)
AS
BEGIN
    UPDATE Productos
    SET
        CategoriaProductos_idCategoriaProductos = @CategoriaProductos_idCategoriaProductos,
        usuarios_idusuarios = @usuarios_idusuarios,
        nombre = @nombre,
        marca = @marca,
        codigo = @codigo,
        stock = @stock,
        estados_idestados = @estados_idestados,
        precio = @precio,
        foto = @foto
    WHERE idProductos = @idProductos;

    SELECT * FROM Productos WHERE idProductos = @idProductos;
END;

GO

CREATE OR ALTER PROCEDURE DarDeBajaProducto
    @idProductos INT
AS
BEGIN
    UPDATE Productos
    SET estados_idestados = (
        SELECT idestados 
        FROM estados 
        WHERE nombre = 'Inactivo'
    )
    WHERE idProductos = @idProductos;

    SELECT * FROM Productos WHERE idProductos = @idProductos;
END;