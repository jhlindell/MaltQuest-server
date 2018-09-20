const ingredientRoutes = require('./routes/ingredient.routes');
const fakerRoutes = require('./routes/faker.routes');

module.exports = (app) => {
  ingredientRoutes(app);
  fakerRoutes(app);
}