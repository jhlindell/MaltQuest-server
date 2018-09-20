const faker = require('faker');
const Ingredient = require('../models/ingredient.model');

exports.ingredientSeed = async () => {
  const items = [];
  for (let i = 0; i < 200; i += 1) {
    const name = faker.commerce.productName();
    const type = faker.commerce.productMaterial();
    items.push({ name, type });
  }
  try {
    const result = await Ingredient.insertMany(items);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.ingredientClear = async () => {
  try {
    await Ingredient.deleteMany({});
    return 'success in deleting ingredients';
  } catch (err) {
    return err.message;
  }
};