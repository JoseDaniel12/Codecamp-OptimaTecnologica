USE "db-codecamp-optimatecnologica";
GO

CREATE OR ALTER PROCEDURE CrearOrdenConDetalles
    @usuarios_idusuarios INT,
    @detalles NVARCHAR(MAX)
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        DECLARE @idOrden INT;

        INSERT INTO Orden (
            usuarios_idusuarios,
            estados_idestados,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico
        )
        SELECT TOP 1
            u.idusuarios AS usuarios_idusuarios,
            (
                SELECT idestados
                FROM estados
                WHERE nombre = 'Confirmado'
            ),
            u.nombre_completo,
            u.direccion,
            u.telefono,
            u.correo_electronico
        FROM usuarios AS u
        WHERE u.idusuarios = @usuarios_idusuarios;

        SET @idOrden = SCOPE_IDENTITY();

        INSERT INTO OrdenDetalles (
            Orden_idOrden,
            Productos_idProductos,
            cantidad,
            precio,
            subtotal
        )
        SELECT
            @idOrden,
            Productos_idProductos,
            cantidad,
            precio,
            subtotal
        FROM OPENJSON(@detalles)
        WITH (
            idProductos INT,
            Productos_idProductos INT,
            cantidad INT,
            precio FLOAT,
            subtotal FLOAT
        );

        UPDATE Orden
        SET total_orden = (
            SELECT SUM(subtotal)
            FROM OrdenDetalles
            WHERE Orden_idOrden = @idOrden
        )
        WHERE idOrden = @idOrden;

        SELECT * FROM viewOrden WHERE idOrden = @idOrden;
        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        THROW;
    END CATCH;
END;

GO

CREATE OR ALTER PROCEDURE ObtenerOrdenes
AS
BEGIN
    SELECT * FROM viewOrden ORDER BY fecha_creacion DESC;
END;

GO

CREATE OR ALTER PROCEDURE ObtenerOrdenPorId
    @idorden INT
AS
BEGIN
    SELECT * FROM viewOrden WHERE idOrden = @idorden;
END;

GO

CREATE OR ALTER PROCEDURE ObtenerDetallesOrden
    @idOrden INT
AS
BEGIN
    SELECT
        od.*,
        p.nombre AS producto,
        p.foto AS foto
    FROM OrdenDetalles AS od
    LEFT JOIN Productos AS p ON od.Productos_idProductos = p.idProductos
    WHERE Orden_idOrden = @idOrden;
END;

GO

CREATE OR ALTER PROCEDURE CrearOrden
    @usuarios_idusuarios INT,
    @estados_idestados INT,
    @nombre_completo VARCHAR(45),
    @direccion VARCHAR(45),
    @telefono VARCHAR(45),
    @correo_electronico VARCHAR(45),
    @fecha_entrega DATE,
    @total_orden FLOAT
AS
BEGIN
    INSERT INTO Orden (
        usuarios_idusuarios,
        estados_idestados,
        nombre_completo,
        direccion,
        telefono,
        correo_electronico,
        total_orden
    ) VALUES (
        @usuarios_idusuarios,
        (
            SELECT idestados 
            FROM estados 
            WHERE nombre = 'Pendiente'
        ),
        @nombre_completo,
        @direccion,
        @telefono,
        @correo_electronico,
        @total_orden
    );

    SELECT * FROM viewOrden WHERE idorden = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE CrearOrdenPorIdUsuario
    @usuarios_idusuarios INT
AS
BEGIN
    INSERT INTO Orden (
        usuarios_idusuarios,
        estados_idestados,
        nombre_completo,
        direccion,
        telefono,
        correo_electronico
    )
    SELECT TOP 1
        u.idusuarios AS usuarios_idusuarios,
        (
            SELECT idestados 
            FROM estados 
            WHERE nombre = 'Confirmado'
        ),
        u.nombre_completo,
        u.direccion,
        u.telefono,
        u.correo_electronico
    FROM usuarios AS u
    WHERE u.idusuarios = @usuarios_idusuarios;

    SELECT * FROM viewOrden WHERE idorden = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE ActualizarOrden
    @idorden INT,
    @usuarios_idusuarios INT,
    @estados_idestados INT,
    @nombre_completo VARCHAR(45),
    @direccion VARCHAR(45),
    @telefono VARCHAR(45),
    @correo_electronico VARCHAR(45),
    @fecha_entrega DATE,
    @total_orden FLOAT
AS
BEGIN
    UPDATE Orden
    SET usuarios_idusuarios = @usuarios_idusuarios,
        estados_idestados = @estados_idestados,
        nombre_completo = @nombre_completo,
        direccion = @direccion,
        telefono = @telefono,
        correo_electronico = @correo_electronico,
        fecha_entrega = @fecha_entrega,
        total_orden = @total_orden
    WHERE idorden = @idorden;

    SELECT * FROM viewOrden WHERE idorden = @idorden;
END;

GO

CREATE OR ALTER PROCEDURE DarDeBajaOrden
    @idOrden INT
AS
BEGIN
    UPDATE Orden
    SET estados_idestados = (
        SELECT idestados 
        FROM estados 
        WHERE nombre = 'Cancelado'
    )
    WHERE idorden = @idOrden;

    SELECT * FROM viewOrden WHERE idorden = @idOrden;
END;

GO

CREATE OR ALTER PROCEDURE CrearOrdenDetalle
    @Orden_idOrden INT,
    @Productos_idProductos INT,
    @cantidad INT,
    @precio FLOAT,
    @subtotal FLOAT
AS
BEGIN
    INSERT INTO OrdenDetalles (
        Orden_idOrden,
        Productos_idProductos,
        cantidad,
        precio,
        subtotal
    ) VALUES (
        @Orden_idOrden,
        @Productos_idProductos,
        @cantidad,
        @precio,
        @subtotal
    );

    SELECT * FROM OrdenDetalles WHERE idOrdenDetalles = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE ActualizarOrdenDetalle
    @idOrdenDetalles INT,
    @Orden_idOrden INT,
    @Productos_idProductos INT,
    @cantidad INT,
    @precio FLOAT,
    @subtotal FLOAT
AS
BEGIN
    UPDATE OrdenDetalle
    SET Orden_idOrden = @Orden_idOrden,
        Productos_idProductos = @Productos_idProductos,
        cantidad = @cantidad,
        precio = @precio,
        subtotal = @subtotal
    WHERE idOrdenDetalles = @idOrdenDetalles;

    SELECT * FROM OrdenDetalle WHERE idOrdenDetalles = @idOrdenDetalles;
END;

GO

CREATE OR ALTER PROCEDURE RecharzarOrden
    @idOrden INT
AS
BEGIN
    UPDATE Orden
    SET estados_idestados = (
        SELECT idestados
        FROM estados
        WHERE nombre = 'Rechazado'
    )
    WHERE idOrden = @idOrden;

    UPDATE Productos
    SET stock = stock + od.cantidad
    FROM OrdenDetalles od
    WHERE (
        Productos.idProductos = od.Productos_idProductos AND
        Orden_idOrden = @idOrden
    );

    SELECT * FROM viewOrden WHERE idOrden = @idOrden;
END;