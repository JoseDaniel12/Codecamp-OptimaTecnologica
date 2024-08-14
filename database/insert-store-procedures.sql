USE "db-codecamp-optimatecnologica";
GO

CREATE OR ALTER PROCEDURE InsertarEstado
    @nombre VARCHAR(45)
AS
BEGIN
    INSERT INTO estados (nombre)
    VALUES (@nombre);

    SELECT * FROM estados WHERE idestados = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE InsertarRol
    @nombre VARCHAR(45)
AS
BEGIN
    INSERT INTO rol (nombre)
    VALUES (@nombre);

    SELECT * FROM rol WHERE idrol = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE InsertarUsuario
    @rol_idrol INT,
    @estados_idestados INT,
    @correo_electronico VARCHAR(45),
    @nombre_completo VARCHAR(45),
    @password VARCHAR(45),
    @telefono VARCHAR(45),
    @fecha_nacimiento DATE
AS
BEGIN
    INSERT INTO usuarios (
        rol_idrol,
        estados_idestados,
        correo_electronico,
        nombre_completo,
        password,
        telefono,
        fecha_nacimiento
    )
    VALUES (
        @rol_idrol,
        @estados_idestados,
        @correo_electronico,
        @nombre_completo,
        @password,
        @telefono,
        @fecha_nacimiento
    );

    SELECT * FROM usuarios WHERE idusuarios = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE InsertarCategoriaProducto
    @usuarios_idusuarios INT,
    @nombre VARCHAR(45),
    @estados_idestados INT
AS 
BEGIN
    INSERT INTO CategoriaProductos (
        usuarios_idusuarios,
        nombre,
        estados_idestados
    ) VALUES (
        @usuarios_idusuarios,
        @nombre,
        @estados_idestados
    );

    SELECT * FROM CategoriaProductos WHERE idCategoriaProductos = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE InsertarOrden
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
        fecha_entrega,
        total_orden
    ) VALUES (
        @usuarios_idusuarios,
        @estados_idestados,
        @nombre_completo,
        @direccion,
        @telefono,
        @correo_electronico,
        @fecha_entrega,
        @total_orden
    );

    SELECT * FROM Orden WHERE idorden = SCOPE_IDENTITY();
END;

GO

CREATE OR ALTER PROCEDURE InsertarProductos
    @CategoriaProductos_idCategoriaProductos INT,
    @usuarios_idusuarios INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @estados_idestados INT,
    @precio FLOAT,
    @foto BINARY
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

CREATE OR ALTER PROCEDURE InsertarOrdenDetalles (
    @Orden_idorden INT,
    @Productos_idProductos INT,
    @cantidad FLOAT,
    @precio FLOAT,
    @subtotal FLOAT
)
AS
BEGIN
    INSERT INTO OrdenDetalles (
        Orden_idorden,
        Productos_idProductos,
        cantidad,
        precio,
        subtotal
    ) VALUES (
        @Orden_idorden,
        @Productos_idProductos,
        @cantidad,
        @precio,
        @subtotal
    );

    SELECT * FROM OrdenDetalles WHERE idOrdenDetalles = SCOPE_IDENTITY();
END;