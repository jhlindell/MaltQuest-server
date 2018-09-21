const faker = require('faker');
const Ingredient = require('../models/ingredient.model');
const Recipe = require('../models/recipe.model');

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

exports.recipeSeed = async () => {
  const recipes = [];
  let rando = 0;
  const ingredientList = await Ingredient.find();
  for (let i = 0; i < 200; i += 1) {
    const name = faker.commerce.productName();
    const description = faker.lorem.paragraph();
    const style = faker.commerce.productAdjective();
    const batchSize = '5.5 gallons';
    // make instructions
    const instructions = [];
    rando = Math.random() * 5;
    for (let j = 0; j < rando; j += 1) {
      instructions.push(faker.lorem.sentence());
    }
    // make ingredients
    const ingredients = [];
    rando = (Math.random() * 3) + 1;
    for (let k = 0; k < rando; k += 1) {
      const ingredient = ingredientList[Math.floor(Math.random() * ingredientList.length)];
      ingredients.push({
        amount: (Math.random() * 8).toFixed(2),
        type: faker.commerce.productMaterial(),
        name: ingredient.name,
        _id: ingredient._id,
      });
    }
    recipes.push({
      name,
      description,
      style,
      batchSize,
      instructions,
      ingredients,
    });
  }
  try {
    const result = await Recipe.insertMany(recipes);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.recipeClear = async () => {
  try {
    await Recipe.deleteMany({});
    return 'success in deleting recipes';
  } catch (err) {
    return err.message;
  }
};