
const express = require('express');
const Carro = require('../models/Carro');
const router = express.Router();

// Rota para listar todos os carros
router.get('/carros', async (req, res) => {
    try {
        const carros = await Carro.find();
        res.json(carros);
    } catch (err) {
        res.status(500).send('Erro ao buscar carros.');
    }
});

// Rota para adicionar um carro
router.post('/carros', async (req, res) => {
    try {
      const { modelo, marca, ano, foto, destaque, preco, quilometragem, cor, combustivel, placa, cambio, fotos, descricao    } = req.body;
  
      // Certifique-se de que a URL começa com "/" (relativo à pasta public)
      if (!foto.startsWith("/")) {
        return res.status(400).json({ error: "Caminho da imagem inválido" });
      }

       // Certifique-se de que o preco seja um número válido
       if (isNaN(preco) || preco < 0) {
        return res.status(400).json({ error: "Preço inválido" });
    }
  
      const novoCarro = new Carro({
        modelo,
        marca,
        ano,
        foto,  // Aqui salva a URL da imagem fornecida
        destaque,
        preco,
        quilometragem,
        cor,
        combustivel,
        placa,
        cambio,
        fotos,
        descricao,

      });
  
      await novoCarro.save();
      console.log("Novo carro salvo:", novoCarro);  // Adiciona este log
      res.status(201).json({ message: 'Carro salvo com sucesso', carro: novoCarro });
  
    } catch (error) {
      console.error("Erro ao salvar carro:", error);
      res.status(500).json({ error: 'Erro ao salvar o carro' });
    }
  });
// Rota para atualizar um carro existente
router.put('/carros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const carroAtualizado = await Carro.findByIdAndUpdate(id, req.body, { new: true });
        res.json(carroAtualizado);
    } catch (err) {
        res.status(400).send('Erro ao atualizar carro.');
    }
});

// Rota para deletar um carro
router.delete('/carros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Carro.findByIdAndDelete(id);
        res.send('Carro removido com sucesso.');
    } catch (err) {
        res.status(400).send('Erro ao remover carro.');
    }
});

// Rota para atualizar o status de destaque do carro
router.put('/carros/:id/destaque', async (req, res) => {
    try {
        const { destaque } = req.body;
        const carroAtualizado = await Carro.findByIdAndUpdate(
            req.params.id,
            { destaque },
            { new: true }
        );

        if (!carroAtualizado) {
            return res.status(404).send({ error: 'Carro não encontrado.' });
        }

        res.status(200).send(carroAtualizado);
    } catch (error) {
        res.status(400).send({ error: 'Erro ao atualizar destaque do carro.' });
    }   
}); // <-- Aqui estava o erro! Essa chave estava faltando.
// Rota para buscar um carro pelo ID
router.get("/carros/:id", async (req, res) => {
    try {
        const carro = await Carro.findById(req.params.id); // Busca pelo ID no banco
        if (!carro) {
            return res.status(404).json({ message: "Carro não encontrado" });
        }
        res.json(carro); // Retorna os detalhes do carro
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar carro", error });
    }
});


module.exports = router;