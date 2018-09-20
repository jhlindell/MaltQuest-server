const ingredients = require('../controllers/ingredient.controller');

module.exports = (app) => {
  // create and save a single ingredient
  app.post('/api/ingredients', async(req, res) => {
    const { name, type } = req.body;
    try {
      const ingredient = await ingredients.create(name, type);
      res.send(ingredient);
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: err.message,
        });
      } else {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating item.',
        });
      }
    }
  });

  // get all ingredients using page and limit for pagination. search is optional query parameter
  app.get('/api/ingredients', async(req, res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const { search } = req.query;
    try {
      const list = await ingredients.findAll(page, limit, search);
      res.send(list);
    } catch (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving items.',
      });
    }
  });

  // get single ingredient by id
  app.get('/api/ingredients/:ingId', async(req,res) => {
    const id = req.params.ingId;
    try {
      const ing = await ingredients.findOne(id);
      if (ing._id) {
        res.send(ing);
      }
    } catch (err) {
      if (err.message === `Item not found with id: ${id}`) {
        res.status(404).send({
          message: err.message,
        });
      } else {
        res.status(500).send({
          message: err.message,
        });
      }
    }
  });

  // delete an ingredient by id
  app.delete('/api/ingredients/:ingId', async (req, res) => {
    const id = req.params.ingId;
    try {
      const item = await ingredients.delete(id);
      if (item._id) {
        res.send(item);
      } else {
        res.status(404).send({
          message: `Item not found with id: ${id}`,
        });
      }
    } catch (err) {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        res.status(404).send({
          message: `Item not found with id: ${id}`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete item with id ${id}`,
        });
      }
    }
  });

  // update an ingredient
  app.put('/api/ingredients/:ingId', async(req, res) => {
    const { name, type } = req.body;
    const id = req.params.ingId;
    try {
      const item = await ingredients.update(name, type, id);
      res.send(item);
    } catch (err) {
      if (err.kind === 'ObjectId' || err.message === `Item not found with id ${id}`) {
        res.status(404).send({
          message: `Item not found with id ${id}`,
        });
      } else {
        res.status(500).send({
          message: err.message,
        });
      }
    }
  })
};