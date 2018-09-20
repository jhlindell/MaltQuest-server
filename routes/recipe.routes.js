const recipes = require('../controllers/recipe.controller');

module.exports = (app) => {
  //create and save a new recipe
  app.post('/api/recipes', async(req,res) => {
    const {
      name, description, style, batchSize, instructions, ingredients,
    } = req.body;
    try {
      const recipe = await recipes.create(name, description, style, batchSize, instructions, ingredients);
      res.send(recipe);
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: err.message,
        });
      } else {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating recipe.',
        });
      }
    }
  });

  app.get('/api/recipes', async(req,res) => {
    try {
      const list = await recipes.findAll();
      res.send(list);
    } catch (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving items.',
      });
    }
  });

  // get single recipe by id
  app.get('/api/recipes/:rId', async(req,res) => {
    const id = req.params.rId;
    try {
      const recipe = await recipes.findOne(id);
      if (recipe._id) {
        res.send(recipe);
      }
    } catch (err) {
      if (err.message === `Item not found with id: ${id}`) {
        res.status(404).send(err);
      } else {
        res.status(500).send(err);
      }
    }
  });
};