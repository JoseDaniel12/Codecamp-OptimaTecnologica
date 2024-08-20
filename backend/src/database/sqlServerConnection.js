const mssql = require('mssql');

// Configuración de la base de datos
const config = {
  server: 'tu_servidor',
  database: 'tu_base_de_datos',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  pool: {
    max: 1, // Número máximo de conexiones en el pool
    min: 1,  // Número mínimo de conexiones en el pool
    idleTimeoutMillis: 30000, // Tiempo máximo de inactividad antes de cerrar la conexión
  }
};

// Creación de Pool de Conexiones Global
let pool;

const getSqlServerPool = async () => {
  try {
    if (!pool) {
      const pool = await mssql.connect(config);
      pool.on('error', err => {
        console.error('Error en el pool de conexiones:', err);
      });
    }
    return pool;
  } catch (err) {
    console.error('Error creando el pool de conexiones:', err);
    throw err;
  }
};

module.exports = { getSqlServerPool };
