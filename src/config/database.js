const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL || 'postgresql://sensivapp_db_user:2ZOLL0HqecDBriRaT7NHK2A8PREtUJDu@dpg-d8s2ace7r5hc73euqr8g-a.oregon-postgres.render.com/sensivapp_db';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com PostgreSQL (Render) estabelecida com sucesso!');
    
    await sequelize.sync({ alter: true });
    console.log('🚀 Tabelas sincronizadas!');
    
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error.message);
  }
}

testConnection();

module.exports = sequelize;
