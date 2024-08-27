USE "db-codecamp-optimatecnologica";
GO

CREATE OR ALTER PROCEDURE ObtenerRoles
AS
BEGIN
    SELECT * FROM rol;
END;

GO

CREATE OR ALTER PROCEDURE ObtenerRolPorId
    @idrol INT
AS
BEGIN
    SELECT * FROM rol WHERE idrol = @idrol;
END;

GO

CREATE OR ALTER PROCEDURE CrearRol
    @nombre VARCHAR(45)
AS
BEGIN
    INSERT INTO rol (nombre)
    VALUES (@nombre);

    SELECT * FROM rol WHERE idrol = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE ActualizarRol
    @idrol INT,
    @nombre VARCHAR(45)
AS
BEGIN
    UPDATE rol
    SET nombre = @nombre
    WHERE idrol = @idrol;

    SELECT * FROM rol WHERE idrol = @idrol;
END;

GO

CREATE OR ALTER PROCEDURE EliminarRolPorId
    @idrol INT
AS
BEGIN
    DELETE FROM rol WHERE idrol = @idrol;
END;