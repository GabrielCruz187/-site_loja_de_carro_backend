const mongoose = require('mongoose');

const CarroSchema = new mongoose.Schema({
    modelo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    foto: {
        type: String, // A foto pode ser uma string simples (caminho relativo)
        required: false
    },
    destaque: {
        type: Boolean,
        default: false // Por padrão, o carro não será um destaque
    },
    preco: {
        type: Number, // Aqui definimos o tipo como Number para o preço
        required: true,
      },
      quilometragem: Number,      // Novo campo
      cor: String,                // Novo campo
      combustivel: String,        // Novo campo
      placa: String,              // Novo campo
      cambio: String,             // Novo campo
      fotos: [String],            // Novo campo para mais fotos
      descricao: String,
    }); 

module.exports = mongoose.model('Carro', CarroSchema);