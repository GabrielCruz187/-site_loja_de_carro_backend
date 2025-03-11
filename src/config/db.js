const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://gabicruz102002:lojacarros123@cluster0.4ssnv.mongodb.net/catalago_carros?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erro ao conectar no MongoDB: ${error.message}`);
        process.exit(1); // Encerra o processo se a conexão falhar
    }
};

module.exports = connectDB;


