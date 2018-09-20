const ingredientRoutes = require('./routes/ingredient.routes');
const fakerRoutes = require('./routes/faker.routes');
const recipeRoutes = require('./routes/recipe.routes')

module.exports = (app) => {
  ingredientRoutes(app);
  fakerRoutes(app);
  recipeRoutes(app);
}