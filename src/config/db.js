const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/catalogo-carros');
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erro ao conectar no MongoDB: ${error.message}`);
        process.exit(1); // Encerra o processo se a conexão falhar
    }
};

module.exports = connectDB;


