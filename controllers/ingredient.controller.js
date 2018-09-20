const Ingredient = require('../models/ingredient.model');
const mongoose = require('mongoose');

exports.create = (name, type) => {
  const ing = new Ingredient({ name, type });
  const error = ing.validateSync();
  if(error){
    throw error;
  } else {
    return ing.save()
      .then(data => data)
      .catch((err) => {
        throw(err);
      });
  }
};

exports.findAll = () => {
  return Ingredient.find()
    .then((response) => {
      const cleanedResponse = response.map((item) => {
        const cleanedItem = {
          _id: item._id,
          name: item.name,
          type: item.type,
        }
        return cleanedItem;
      });
      return cleanedResponse;
    }).catch((err) => {
      throw err;
    });
}

exports.findOne = (id) => {
  let objectId;
  try {
    objectId = mongoose.Types.ObjectId(id);
  } catch (err) {
    throw err;
  }
  return Ingredient.findById(objectId)
    .then((item) => {
      if (item === null) {
        throw new Error(`Item not found with id: ${id}`);
      } else {
        const cleanedItem = {
          _id: item._id,
          name: item.name,
          type: item.type,
        };
        return cleanedItem;
      }
    }).catch((err) => {
      throw err;
    });
}

exports.delete = (id) => {
  let objectId;
  try {
    objectId = mongoose.Types.ObjectId(id);
  } catch (err) {
    throw err;
  }
  return Ingredient.findByIdAndRemove(objectId)
    .then((item) => {
      if (item) {
        return item;
      }
      throw new Error(`Item not found with id: ${id}`);
    })
    .catch((err) => {
      throw err;
    });
};

exports.update = (name, type, id) => {
  let objectId;
  try {
    objectId = mongoose.Types.ObjectId(id);
  } catch (err) {
    throw err;
  }
  const item = new Ingredient({
    name,
    type,
  });
  const error = item.validateSync();
  if (error) {
    throw error;
  } else {
    return Ingredient.findByIdAndUpdate(
      objectId,
      { name, type }, { new: true },
    ).then((ingredient) => {
      if (ingredient) {
        return ingredient;
      }
      throw new Error(`Item not found with id: ${id}`);
    }).catch((err) => {
      throw err;
    });
  }
}