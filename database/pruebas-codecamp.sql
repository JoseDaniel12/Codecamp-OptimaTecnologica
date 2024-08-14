DROP DATABASE "db-codecamp-optimatecnologica";
USE "db-codecamp-optimatecnologica";

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