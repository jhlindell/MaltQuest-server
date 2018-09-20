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

exports.findAll = () => {
  return Recipe.find()
    .then((response) => {
      const cleanedResult = response.map((item) => {
        const cleanedItem = {
          _id: item._id,
          name: item.name,
          description: item.description,
          instructions: item.instructions,
          ingredients: item.ingredients,
          style: item.style,
          batchSize: item.batchSize
        };
        return cleanedItem;
      });
      return cleanedResult;
    }).catch((err) => {
      throw err;
    });
};

exports.findOne = (id) => {
  let objectId;
  try {
    objectId = mongoose.Types.ObjectId(id);
  } catch (err) {
    throw err;
  }
  return Recipe.findById(objectId)
    .then((item) => {
      if (item === null) {
        throw new Error(`Item not found with id: ${id}`);
      } else {
        const cleanedItem = {
          _id: item._id,
          name: item.name,
          description: item.description,
          instructions: item.instructions,
          ingredients: item.ingredients,
          style: item.style,
          batchSize: item.batchSize
        };
        return cleanedItem;
      }
    }).catch((err) => {
      throw err;
    });
}
