DROP DATABASE "db-codecamp-optimatecnologica";
USE "db-codecamp-optimatecnologica";

SELECT * FROM estados;
SELECT * FROM rol;
SELECT * FROM Usuarios;
SELECT * FROM CategoriaProductos;
SELECT * FROM Orden;
SELECT * FROM Productos;
SELECT * FROM OrdenDetalles;

SELECT * FROM viewCategoriaProductos;

EXEC CrearOrdenPorIdUsuario @usuarios_idusuarios = 2;
EXEC ObtenerOrdenes;


ALTER TABLE Orden
ADD CONSTRAINT DF_NombreDeLaTabla_NombreDelCampo DEFAULT 0 FOR NombreDelCampo;


UPDATE usuarios
SET password = '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK';



-- _______________________________________ PROCEDIMIENTOS DE INSERSCIÓN _______________________________________
-- ESTADOS
EXECUTE InsertarEstado @nombre = "Activo";

-- ROLES
EXECUTE InsertarRol @nombre = "Gerente";

-- USUARIOS
EXECUTE InsertarUsuario
    @rol_idrol = 1,
    @estados_idestados = 1,
    @correo_electronico = 'usuario1@gamil.com',
    @nombre_completo = 'usuario1',
    @password = '123',
    @telefono = '123',
    @fecha_nacimiento = '12/12/2000';

-- CATEGORIA DE PRODUCTO
EXECUTE InsertarCategoriaProducto
    @usuarios_idusuarios = 1,
    @nombre = 'Electronicos',
    @estados_idestados = 1;

-- ORDENES
EXECUTE InsertarOrden
    @usuarios_idusuarios = 1,
    @estados_idestados = 1,
    @nombre_completo = 'juan perez',
    @direccion = 'Villa nueva',
    @telefono = '1859375839',
    @correo_electronico = 'usuario1@gmail.com',
    @fecha_entrega = '3/4/2024',
    @total_orden = 120.5;

-- PRODUCTOS
EXECUTE InsertarProductos
    @CategoriaProductos_idCategoriaProductos = 1,
    @usuarios_idusuarios = 1,
    @nombre = 'MacBook Air 2',
    @marca = 'Aplle',
    @codigo = 'HDU38D',
    @stock = 10,
    @estados_idestados = 1,
    @precio = 5400,
    @foto = NULL;

-- DETALLE DE ORDENES
EXECUTE InsertarOrdenDetalles
    @Orden_idorden = 1,
    @Productos_idProductos = 1,
    @cantidad = 2,
    @precio = 120.5,
    @subtotal = 500;


-- _______________________________________ PROCEDIMIENTOS DE ACTUALIZACIÓN _______________________________________
-- ESTADOS
EXECUTE ActualizarEstado @idestados = 1, @nombre = "Activo";

-- ROLES
EXECUTE ActualizarRol @idrol = 1,  @nombre = "Gerente";

-- USUARIOS
EXECUTE ActualizarUsuario
    @idusuarios = 1,
    @rol_idrol = 1,
    @estados_idestados = 1,
    @correo_electronico = 'usuario1@gamil.com',
    @nombre_completo = 'usuario1',
    @password = '123',
    @telefono = '123',
    @fecha_nacimiento = '12/12/2000';

-- CATEGORIA DE PRODUCTO
EXECUTE ActualizarCategoriaProducto
    @idCategoriaProductos = 1,
    @usuarios_idusuarios = 1,
    @nombre = 'Electronicos',
    @estados_idestados = 1;

-- ORDENES
EXECUTE ActualizarOrden
    @idOrden = 1,
    @usuarios_idusuarios = 1,
    @estados_idestados = 1,
    @nombre_completo = 'juan perez',
    @direccion = 'Villa nueva',
    @telefono = '1859375839',
    @correo_electronico = 'usuario1@gmail.com',
    @fecha_entrega = '3/4/2024',
    @total_orden = 100;

-- PRODUCTOS
EXECUTE ActualizarProductos
    @idProductos = 1,
    @CategoriaProductos_idCategoriaProductos = 1,
    @usuarios_idusuarios = 1,
    @nombre = 'MacBook Air 2',
    @marca = 'Aplle',
    @codigo = 'HDU38D',
    @stock = 10,
    @estados_idestados = 1,
    @precio = 7000,
    @foto = NULL;

-- DETALLE DE ORDENES
EXECUTE ActualizarOrdenDetalles
    @idOrdenDetalles = 1,
    @Orden_idorden = 1,
    @Productos_idProductos = 1,
    @cantidad = 2,
    @precio = 200,
    @subtotal = 600;