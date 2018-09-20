const ingredientRoutes = require('./routes/ingredient.routes');

module.exports = (app) => {
  ingredientRoutes(app);
}