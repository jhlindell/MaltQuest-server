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
  return Ingredient.paginate(query, options)
    .then((response) => {
      const result = Object.assign(response);
      const cleanedResponse = response.docs.map((item) => {
        const cleanedItem = {
          _id: item._id,
          name: item.name,
          type: item.type,
        }
        return cleanedItem;
      });
      result.docs = cleanedResponse;
      return result;
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