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