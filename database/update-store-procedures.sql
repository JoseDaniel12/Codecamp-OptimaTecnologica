USE "db-codecamp-optimatecnologica";
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

CREATE OR ALTER PROCEDURE ActualizarUsuario
    @idusuarios INT,
    @rol_idrol INT,
    @estados_idestados INT,
    @correo_electronico VARCHAR(45),
    @nombre_completo VARCHAR(45),
    @password VARCHAR(45),
    @telefono VARCHAR(45),
    @fecha_nacimiento DATE
AS
BEGIN
    UPDATE usuarios
    SET rol_idrol = @rol_idrol,
        estados_idestados = @estados_idestados,
        correo_electronico = @correo_electronico,
        nombre_completo = @nombre_completo,
        password = @password,
        telefono = @telefono,
        fecha_nacimiento = @fecha_nacimiento
    WHERE idusuarios = @idusuarios;

    SELECT * FROM usuarios WHERE idusuarios = @idusuarios;
END;

GO

CREATE OR ALTER PROCEDURE ActualizarCategoriaProducto
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

    SELECT * FROM Orden WHERE idorden = @idorden;
END;

GO

CREATE OR ALTER PROCEDURE ActualizarProductos
    @idProductos INT,
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
    UPDATE Productos
    SET CategoriaProductos_idCategoriaProductos = @CategoriaProductos_idCategoriaProductos,
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

CREATE OR ALTER PROCEDURE ActualizarOrdenDetalles (
    @idOrdenDetalles INT,
    @Orden_idorden INT,
    @Productos_idProductos INT,
    @cantidad FLOAT,
    @precio FLOAT,
    @subtotal FLOAT
)
AS
BEGIN
    UPDATE OrdenDetalles
    SET Orden_idorden = @Orden_idorden,
        Productos_idProductos = @Productos_idProductos,
        cantidad = @cantidad,
        precio = @precio,
        subtotal = @subtotal
    WHERE idOrdenDetalles = @idOrdenDetalles;

    SELECT * FROM OrdenDetalles WHERE idOrdenDetalles = @idOrdenDetalles;
END;