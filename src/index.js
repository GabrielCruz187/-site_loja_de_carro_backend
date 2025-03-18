// src/index.js
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Middleware para log das requisições (deve estar antes das rotas)
app.use((req, res, next) => {
    console.log(`Método: ${req.method}, URL: ${req.url}, Body:`, req.body);
    next();
});



// Conectar ao banco de dados
connectDB();

// Rota raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo à API do Catálogo de Carros!');
});

app.use(express.json({ limit: '10mb' })); // Ajuste o limite para o tamanho desejado


// Montar as rotas
app.use('/api', routes);

// Rota para buscar carros com filtro (fora do app.listen)
app.get('/api/carros', async (req, res) => {
    try {
        const searchTerm = req.query.search;
        if (!searchTerm) {
            return res.json([]);
        }

        const carros = await Carro.find({
            modelo: { $regex: searchTerm, $options: 'i' }, // Faz uma busca por nome ignorando maiúsculas/minúsculas
        });

        res.json(carros);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar carros' });
    }
});

// Porta do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
