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