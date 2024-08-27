USE "db-codecamp-optimatecnologica";
GO


CREATE OR ALTER PROCEDURE ObtenerEstados
AS
BEGIN
    SELECT * FROM estados;
END;

GO

CREATE OR ALTER PROCEDURE ObtenerEstadoPorId
    @idestados INT
AS
BEGIN
    SELECT * FROM estados WHERE idestados = @idestados;
END;

GO

CREATE OR ALTER PROCEDURE ObtenerEstadoPorNombre
    @nombre VARCHAR(45)
AS
BEGIN
    SELECT * FROM estados WHERE nombre = @nombre;
END;

GO

CREATE OR ALTER PROCEDURE CrearEstado
    @nombre VARCHAR(45)
AS
BEGIN
    INSERT INTO estados (nombre)
    VALUES (@nombre);

    SELECT * FROM estados WHERE idestados = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE ActualizarEstado
    @idestados INT,
    @nombre VARCHAR(45)
AS
BEGIN
    UPDATE estados
    SET nombre = @nombre
    WHERE idestados = @idestados;

    SELECT * FROM estados WHERE idestados = @idestados;
END;

GO

CREATE OR ALTER PROCEDURE EliminarEstadoPorId
    @idestados INT
AS
BEGIN
    DELETE FROM estados WHERE idestados = @idestados;
END;