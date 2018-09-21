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

  //get all recipes
  app.get('/api/recipes', async(req,res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const { search } = req.query;
    try {
      const list = await recipes.findAll(page, limit, search);
      res.send(list);
    } catch (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving recipes.',
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
      if (err.message === `Recipe not found with id: ${id}`) {
        res.status(404).send({
          message: err.message,
        });
      } else {
        console.log(err);
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving recipes.',
        });
      }
    }
  });

  // delete single recipe by id
  app.delete('/api/recipes/:rId', async(req, res) => {
    const id = req.params.rId;
    try {
      const recipe = await recipes.delete(id);
      if (recipe._id) {
        res.send(recipe);
      } else {
        res.status(404).send({
          message: `Recipe not found with id: ${id}`,
        });
      }
    } catch (err) {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        res.status(404).send({
          message: `Recipe not found with id: ${id}`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete recipe with id ${id}`,
        });
      }
    }
  });

  // update an ingredient
  app.put('/api/recipes/:rId', async(req,res) => {
    const {
      name, description, style, batchSize, instructions, ingredients,
    } = req.body;
    const id = req.params.rId;
    try {
      const recipe = await recipes.update(name, description, style, batchSize, instructions, ingredients, id);
      res.send(recipe);
    } catch (err) {
      if (err.kind === 'ObjectId' || err.message === `Recipe not found with id ${id}`) {
        res.status(404).send({
          message: `Recipe not found with id ${id}`,
        });
      } else {
        res.status(500).send({
          message: err.message,
        });
      }
    }
  });
};