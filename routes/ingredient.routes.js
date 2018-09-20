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

  app.get('/api/ingredients', async(req, res) => {
    try {
      const list = await ingredients.findAll();
      res.send(list);
    } catch (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving items.',
      });
    }
  })
};