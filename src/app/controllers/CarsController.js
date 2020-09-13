const Post = require('../schemas/Post');

const Price = require('../schemas/Price');

class CarsController {
  async index(req, res) {
    const modelos = await Post.find().populate('precos');
  
    return res.json({ modelos });
  }

  async show(req, res) {
    try {
      const { modelo, ano } = req.query;
  
      const modelos = await Post.find({
        modelo,
        ano,
      }).populate('precos');
  
      return res.json({ modelos });
    } catch (err) {
      return res.status(400).json({ error: 'Modelo não encontrado!' });
    }
  }

  async showCars(req, res) {
    try {
      const { modelo, ano, versao, estado } = req.query;
  
      const carro = await Post.find({
        modelo,
        ano,
        versao,
        estado,
      }).populate('precos');
  
      return res.json({ carro });
    } catch (err) {
      return res.status(400).json({ error: 'Modelo não encontrado!' });
    }
  }

  async create(req, res) {
    try {
      const { modelo, ano, versao, estado, imagemUrl, precos } = req.body;
  
      if (await Post.findOne({ modelo, ano, versao }))
        return res.status(400).json({ error: 'Modelo já existe!' });
  
      const carro = await Post.create({
        modelo,
        ano,
        versao,
        estado,
        imagemUrl,
      });
  
      await Promise.all(
        precos.map(async (preco) => {
          const postPrice = new Price({ ...preco, post: carro._id });
  
          await postPrice.save();
  
          carro.precos.push(postPrice);
        })
      );
  
      await carro.save();
  
      return res.json({ carro });
    } catch (err) {
      return res.status(400).json({ error: 'Registrar falhou!' });
    }
  }

  async update(req, res) {
    try {
      const { modelo, versao, precos } = req.body;
  
      const carro = await Post.findByIdAndUpdate(
        req.params.id,
        {
          modelo,
          versao,
        },
        { new: true }
      ).populate('precos');
  
      if (!carro) {
        return res.status(400).json({ error: 'Modelo não encontrado!' });
      }
  
      carro.precos = [];
      await Price.remove({ post: carro._id });
  
      await Promise.all(
        precos.map(async (preco) => {
          const postPrice = new Price({ ...preco, post: carro._id });
  
          await postPrice.save();
  
          carro.precos.push(postPrice);
        })
      );
  
      await carro.save();
  
      return res.json({ carro });
    } catch (err) {
      return res.status(400).json({ error: 'Atualizar falhou!' });
    }
  }

  async delete(req, res) {
    try {
      const post = Post.findById(req.params.id);
  
      await post.remove();
  
      return res.json({ message: 'ok' });
    } catch (err) {
      return res.status(400).json({ error: 'Modelo não encontrado!' });
    }
  }
}

module.exports = CarsController;