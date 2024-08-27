USE [db-codecamp-optimatecnologica];

GO

-- Insertar estados
INSERT INTO dbo.estados (nombre) VALUES ('Activo'), ('Inactivo'), ('Confirmado'), ('Entregado'), ('Rechazado');

-- Insertar roles
INSERT INTO dbo.rol (nombre) VALUES ('Operador Administrativo'), ('Cliente');

-- Insertar 12 usuarios
INSERT INTO dbo.usuarios (rol_idrol, estados_idestados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento)
VALUES
(2, 1, 'user1@gmail.com', 'Usuario Uno', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567890', '1980-01-01'),
(2, 1, 'user2@gmail.com', 'Usuario Dos', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567891', '1981-02-01'),
(2, 1, 'user3@gmail.com', 'Usuario Tres', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567892', '1982-03-01'),
(2, 1, 'user4@gmail.com', 'Usuario Cuatro', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567893', '1983-04-01'),
(2, 1, 'user5@gmail.com', 'Usuario Cinco', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567894', '1984-05-01'),
(2, 1, 'user6@gmail.com', 'Usuario Seis', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567895', '1985-06-01'),
(2, 1, 'user7@gmail.com', 'Usuario Siete', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567896', '1986-07-01'),
(2, 1, 'user8@gmail.com', 'Usuario Ocho', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567897', '1987-08-01'),
(2, 1, 'user9@gmail.com', 'Usuario Nueve', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567898', '1988-09-01'),
(2, 1, 'user10@gmail.com', 'Usuario Diez', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567899', '1989-10-01'),
(2, 1, 'user11@gmail.com', 'Usuario Once', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567890', '1990-11-01'),
(2, 1, 'user12@example.com', 'Usuario Doce', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '1234567891', '1991-12-01'),
(1, 1, 'admin@gmail.com', 'Administrador', '$2a$04$EAlvbl5VvHbgPbNpI7GlR.M18ebUmG/EOegP4FRdFtk1M0YG9VjPK', '73846723', '2000-12-12');

-- Insertar 12 categorías de productos
INSERT INTO dbo.CategoriaProductos (usuarios_idusuarios, nombre, estados_idestados)
VALUES
(1, 'Electrónica', 1),
(2, 'Hogar', 1),
(3, 'Deportes', 1),
(4, 'Juguetes', 1),
(5, 'Ropa', 1),
(6, 'Alimentos', 1),
(7, 'Bebidas', 1),
(8, 'Libros', 1),
(9, 'Muebles', 1),
(10, 'Cosméticos', 1),
(11, 'Herramientas', 1),
(12, 'Jardinería', 1);

-- Insertar 12 productos
INSERT INTO dbo.Productos (CategoriaProductos_idCategoriaProductos, usuarios_idusuarios, nombre, marca, codigo, stock, estados_idestados, precio)
VALUES
(1, 1, 'Laptop', 'HP', 'LP1001', 10, 1, 500.00),
(2, 2, 'Sofá', 'IKEA', 'SF2001', 5, 1, 300.00),
(3, 3, 'Bicicleta', 'Trek', 'BC3001', 7, 1, 450.00),
(4, 4, 'Lego Set', 'Lego', 'LG4001', 20, 1, 50.00),
(5, 5, 'Camiseta', 'Nike', 'TS5001', 30, 1, 20.00),
(6, 6, 'Manzanas', 'Orgánico', 'AP6001', 50, 1, 1.00),
(7, 7, 'Cerveza', 'Corona', 'BR7001', 100, 1, 2.00),
(8, 8, 'Libro', 'HarperCollins', 'BK8001', 15, 1, 15.00),
(9, 9, 'Mesa', 'Ashley', 'TB9001', 10, 1, 150.00),
(10, 10, 'Maquillaje', 'Maybelline', 'MK1001', 25, 1, 10.00),
(11, 11, 'Taladro', 'Bosch', 'DR11001', 8, 1, 80.00),
(12, 12, 'Tierra para jardín', 'Scotts', 'SO12001', 40, 1, 10.00);

-- Insertar pedidos
INSERT INTO dbo.Orden (usuarios_idusuarios, estados_idestados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden)
VALUES
(1, 4, 'Usuario Uno', 'Dirección 1', '1234567890', 'user1@example.com', '2024-08-15', 550.00),
(2, 4, 'Usuario Dos', 'Dirección 2', '1234567891', 'user2@example.com', '2024-08-16', 320.00),
(3, 4, 'Usuario Tres', 'Dirección 3', '1234567892', 'user3@example.com', '2024-08-17', 470.00),
(4, 4, 'Usuario Cuatro', 'Dirección 4', '1234567893', 'user4@example.com', '2024-08-18', 70.00),
(5, 4, 'Usuario Cinco', 'Dirección 5', '1234567894', 'user5@example.com', '2024-08-19', 25.00),
(6, 4, 'Usuario Seis', 'Dirección 6', '1234567895', 'user6@example.com', '2024-08-20', 60.00),
(7, 4, 'Usuario Siete', 'Dirección 7', '1234567896', 'user7@example.com', '2024-08-21', 22.00),
(8, 4, 'Usuario Ocho', 'Dirección 8', '1234567897', 'user8@example.com', '2024-08-22', 30.00),
(9, 4, 'Usuario Nueve', 'Dirección 9', '1234567898', 'user9@example.com', '2024-08-23', 165.00),
(10, 4, 'Usuario Diez', 'Dirección 10', '1234567899', 'user10@example.com', '2024-08-24', 160.00),
(11, 4, 'Usuario Once', 'Dirección 11', '1234567890', 'user11@example.com', '2024-08-25', 90.00),
(12, 4, 'Usuario Doce', 'Dirección 12', '1234567891', 'user12@example.com', '2024-08-26', 100.00);

-- Insertar detalles de los pedidos
INSERT INTO dbo.OrdenDetalles (Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal)
VALUES
(1, 1, 1, 500.00, 500.00),
(1, 6, 50, 1.00, 50.00),
(2, 2, 1, 300.00, 300.00),
(2, 7, 10, 2.00, 20.00),
(3, 3, 1, 450.00, 450.00),
(3, 5, 1, 20.00, 20.00),
(4, 4, 1, 50.00, 50.00),
(4, 8, 1, 15.00, 15.00),
(5, 5, 1, 20.00, 20.00),
(5, 6, 5, 1.00, 5.00),
(6, 6, 30, 1.00, 30.00),
(6, 10, 3, 10.00, 30.00),
(7, 7, 10, 2.00, 20.00),
(7, 8, 1, 15.00, 15.00),
(8, 8, 2, 15.00, 30.00),
(9, 9, 1, 150.00, 150.00),
(9, 12, 1, 15.00, 15.00),
(10, 10, 2, 10.00, 20.00),
(10, 11, 2, 80.00, 160.00),
(11, 11, 1, 80.00, 80.00),
(11, 12, 1, 10.00, 10.00),
(12, 1, 1, 500.00, 500.00),
(12, 3, 1, 450.00, 450.00);