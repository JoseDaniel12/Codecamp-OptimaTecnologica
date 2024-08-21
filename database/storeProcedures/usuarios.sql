USE "db-codecamp-optimatecnologica";
GO

CREATE OR ALTER PROCEDURE ObtenerUsuarios
AS
BEGIN
    SELECT * FROM usuarios;
END;

GO

CREATE OR ALTER PROCEDURE ObtenerUsuarioPorId
    @idusuarios INT
AS
BEGIN
    SELECT * FROM usuarios WHERE idusuarios = @idusuarios;
END;

GO

CREATE OR ALTER PROCEDURE CrearUsuario
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
    SET
        rol_idrol = @rol_idrol,
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

CREATE OR ALTER PROCEDURE DarBajaUsuario
    @idusuarios INT
AS
BEGIN
    UPDATE usuarios
    SET estados_idestados = (
        SELECT idestados 
        FROM estados
        WHERE nombre = 'Inactivo'
    )
    WHERE idusuarios = @idusuarios;

    SELECT * FROM usuarios WHERE idusuarios = @idusuarios;
END;