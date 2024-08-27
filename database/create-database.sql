IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'db-codecamp-optimatecnologica')
BEGIN
    CREATE DATABASE [db-codecamp-optimatecnologica];
END;

GO

USE [db-codecamp-optimatecnologica];

GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'estados' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.estados (
        idestados  INT IDENTITY(1,1) PRIMARY KEY,
        nombre VARCHAR(45)
    );
END;


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'rol' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.rol (
        idrol  INT IDENTITY(1,1) PRIMARY KEY,
        nombre VARCHAR(45)
    );
END;


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'usuarios' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.usuarios (
        idusuarios INT IDENTITY(1,1) PRIMARY KEY,
        rol_idrol INT,
        estados_idestados INT,
        correo_electronico VARCHAR(45),
        nombre_completo VARCHAR(45),
        direccion VARCHAR(545) DEFAULT '',
        password VARCHAR(MAX),
        telefono VARCHAR(45) DEFAULT '',
        fecha_nacimiento DATE,
        fecha_creacion DATETIME DEFAULT GETDATE(),

        FOREIGN KEY (rol_idrol) REFERENCES rol(idrol) ON DELETE SET NULL,
        FOREIGN KEY (estados_idestados) REFERENCES estados(idestados) ON DELETE SET NULL
    );
END;


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CategoriaProductos' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.CategoriaProductos (
        idCategoriaProductos INT IDENTITY(1,1) PRIMARY KEY,
        usuarios_idusuarios INT,
        nombre VARCHAR(45),
        estados_idestados INT,
        fecha_creacion DATETIME DEFAULT GETDATE(),

        FOREIGN KEY (usuarios_idusuarios) REFERENCES usuarios(idusuarios) ON DELETE SET NULL,
        FOREIGN KEY (estados_idestados) REFERENCES estados(idestados) ON DELETE SET NULL
    );
END;


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Orden' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.Orden (
        idOrden INT IDENTITY(1,1) PRIMARY KEY,
        usuarios_idusuarios INT,
        estados_idestados INT,
        fecha_creacion DATETIME DEFAULT GETDATE(),
        nombre_completo VARCHAR(45),
        direccion VARCHAR(545),
        telefono VARCHAR(45),
        correo_electronico VARCHAR(45),
        fecha_entrega DATE,
        total_orden FLOAT DEFAULT 0,

        FOREIGN KEY (usuarios_idusuarios) REFERENCES usuarios(idusuarios) ON DELETE SET NULL,
        FOREIGN KEY (estados_idestados) REFERENCES estados(idestados) ON DELETE SET NULL
    );
END;


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Productos' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.Productos (
        idProductos INT IDENTITY(1,1) PRIMARY KEY,
        CategoriaProductos_idCategoriaProductos INT,
        usuarios_idusuarios INT,
        nombre VARCHAR(45),
        marca VARCHAR(45),
        codigo VARCHAR(45),
        stock FLOAT DEFAULT 0,
        estados_idestados INT,
        precio FLOAT DEFAULT 0,
        fecha_creacion DATETIME DEFAULT GETDATE(),
        foto VARBINARY(MAX),

        FOREIGN KEY (CategoriaProductos_idCategoriaProductos) REFERENCES CategoriaProductos(idCategoriaProductos) ON DELETE SET NULL,
        FOREIGN KEY (usuarios_idusuarios) REFERENCES usuarios(idusuarios) ON DELETE SET NULL,
        FOREIGN KEY (estados_idestados) REFERENCES estados(idestados) ON DELETE SET NULL
    );
END;


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'OrdenDetalles' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.OrdenDetalles (
        idOrdenDetalles INT IDENTITY(1,1) PRIMARY KEY,
        Orden_idOrden INT,
        Productos_idProductos INT,
        cantidad INT,
        precio FLOAT DEFAULT 0,
        subtotal FLOAT DEFAULT 0,

        FOREIGN KEY (Orden_idOrden) REFERENCES Orden(idOrden) ON DELETE SET NULL,
        FOREIGN KEY (Productos_idProductos) REFERENCES Productos(idProductos) ON DELETE SET NULL
    );
END;