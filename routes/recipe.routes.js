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
};