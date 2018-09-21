const faker = require('../controllers/faker.controller');

module.exports = (app) => {
  // Seed database with a number of ingredients
  app.get('/api/seed_ingredients/', async (req, res) => {
    try {
      const items = await faker.ingredientSeed();
      res.send(items);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });

  // empty database of ingredients
  app.get('/api/clear_ingredients/', async (req, res) => {
    const message = await faker.ingredientClear();
    res.send({ message });
  });

  // Seed database with a number of recipes
  app.get('/api/seed_recipes/', async (req, res) => {
    try {
      const list = await faker.recipeSeed();
      res.send(list);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });

  // empty database of recipes
  app.get('/api/clear_recipes', async (req,res) => {
    const message = await faker.recipeClear();
    res.send({ message });
  })
}