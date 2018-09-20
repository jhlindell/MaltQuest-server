const Recipe = require('../models/recipe.model');
const mongoose = require('mongoose');

exports.create = (name, description, style, batchSize, instructions, ingredients) => {
  const recipe = new Recipe({
    name, description, style, batchSize, instructions, ingredients
  });
  const error = recipe.validateSync();
  if (error) {
    throw error;
  } else {
    return recipe.save()
      .then(data => data)
      .catch((err) => {
        throw err;
      });
  }
};