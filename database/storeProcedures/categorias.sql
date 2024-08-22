USE "db-codecamp-optimatecnologica";
GO

CREATE OR ALTER PROCEDURE ObtenerCategorias
AS
BEGIN
    SELECT * FROM CategoriaProductos;
END;

GO

CREATE OR ALTER PROCEDURE ObtenerCategoriaPorId
    @idCategoriaProductos INT
AS
BEGIN
    SELECT * FROM CategoriaProductos WHERE idCategoriaProductos = @idCategoriaProductos;
END;

GO

CREATE OR ALTER PROCEDURE CrearCategoria
    @usuarios_idusuarios INT,
    @nombre VARCHAR(45),
    @estados_idestados INT
AS
BEGIN
    INSERT INTO CategoriaProductos (usuarios_idusuarios, nombre, estados_idestados)
    VALUES (@usuarios_idusuarios, @nombre, @estados_idestados);

    SELECT * FROM CategoriaProductos WHERE idCategoriaProductos = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE ActualizarCategoria
    @idCategoriaProductos INT,
    @usuarios_idusuarios INT,
    @nombre VARCHAR(45),
    @estados_idestados INT
AS
BEGIN
    UPDATE CategoriaProductos
    SET usuarios_idusuarios = @usuarios_idusuarios,
        nombre = @nombre,
        estados_idestados = @estados_idestados
    WHERE idCategoriaProductos = @idCategoriaProductos;

    SELECT * FROM CategoriaProductos WHERE idCategoriaProductos = @idCategoriaProductos;
END;

GO

CREATE OR ALTER PROCEDURE DarBajaCategoriaPorId
    @idCategoriaProductos INT
AS
BEGIN
    UPDATE CategoriaProductos
    SET estados_idestados = (
        SELECT idestados FROM estados WHERE nombre = 'Inactivo'
    )
    WHERE idCategoriaProductos = @idCategoriaProductos;

    SELECT * FROM CategoriaProductos WHERE @idCategoriaProductos = @idCategoriaProductos;
END;