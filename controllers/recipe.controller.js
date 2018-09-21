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

exports.findAll = (page, limit, search) => {
  const query = {};
  if (search !== undefined) {
    query.name = { $regex: search, $options: 'i' };
  }
  const options = {
    page,
    limit,
    sort: { name: 1 },
  };
  return Recipe.paginate(query, options)
    .then((response) => {
      const result = Object.assign(response);
      const cleanedResult = response.docs.map((recipe) => {
        const cleanedRecipe = {
          _id: recipe._id,
          name: recipe.name,
          description: recipe.description,
          instructions: recipe.instructions,
          ingredients: recipe.ingredients,
          style: recipe.style,
          batchSize: recipe.batchSize
        };
        return cleanedRecipe;
      });
      result.docs = cleanedResult;
      return result;
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
    .then((recipe) => {
      if (recipe === null) {
        throw new Error(`Item not found with id: ${id}`);
      } else {
        const cleanedRecipe = {
          _id: recipe._id,
          name: recipe.name,
          description: recipe.description,
          instructions: recipe.instructions,
          ingredients: recipe.ingredients,
          style: recipe.style,
          batchSize: recipe.batchSize
        };
        return cleanedRecipe;
      }
    }).catch((err) => {
      throw err;
    });
};

exports.delete = (id) => {
  let objectId;
  try {
    objectId = mongoose.Types.ObjectId(id);
  } catch (err) {
    throw err;
  }
  return Recipe.findByIdAndRemove(objectId)
    .then((recipe) => {
      if (recipe) {
        return recipe;
      }
      throw new Error(`Recipe not found with id: ${id}`);
    })
    .catch((err) => {
      throw err;
    });
}

exports.update = (name, description, style, batchSize, instructions, ingredients, id) => {
  let objectId;
  try {
    objectId = mongoose.Types.ObjectId(id);
  } catch (err) {
    throw err;
  }
  const newRecipe = new Recipe({
    name, description, style, batchSize, instructions, ingredients,
  });
  const error = newRecipe.validateSync();
  if (error) {
    throw error;
  } else {
    return Recipe.findByIdAndUpdate(
      objectId,
      { name, description, style, batchSize, instructions, ingredients }, { new: true },
    ).then((recipe) => {
      if (recipe) {
        return recipe;
      }
      throw new Error(`Item not found with id: ${id}`);
    }).catch((err) => {
      throw err;
    });
  }
}
