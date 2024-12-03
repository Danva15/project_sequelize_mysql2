const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('directorio', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});


sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa!'))
    .catch((err) => console.error('No se pudo conectar a la base de datos:', err));


const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});


sequelize.sync()
    .then(() => console.log('Tablas sincronizadas'))
    .catch((err) => console.error('Error sincronizando las tablas:', err));

module.exports = { sequelize, User }; 



