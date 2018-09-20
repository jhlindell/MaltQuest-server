const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-lazarus');

const { Schema } = mongoose;

function ingredientCount(val) {
  return val.length >= 1;
}

const Ingredient = Schema({
  amount: {
    type: String,
    required: [true, 'Ingredient amount is required'],
  },
  type: {
    type: String,
    required: [true, 'Ingredient type is required'],
  },
  name: {
    type: String,
    required: [true, 'Ingredient name is required'],
  },
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'Ingredient',
  },
});

const RecipeSchema = Schema({
  recipeID: Schema.Types.ObjectId,
  name: {
    type: String,
    minlength: [2, 'Name must be longer than 2 characters.'],
    required: [true, 'Name is required'],
  },
  description: {
    type: String,
    minlength: [2, 'Description must be longer than 2 characters.'],
    required: [true, 'Description is required'],
  },
  style: {
    type: String,
    minlength: [2, 'Style must be longer than 2 characters.'],
    required: [true, 'Style is required'],
  },
  batchSize: {
    type: String,
    minlength: [2, 'Batch Size must be longer than 2 characters.'],
    required: [true, 'Batch Size is required'],
  },
  instructions: [String],
  ingredients: {
    type: [Ingredient],
    validate: [ingredientCount, 'Need to have at least one ingredient'],
  },
}, { collation: { locale: 'en_US', strength: 1 }, timestamps: true });

RecipeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Recipe', RecipeSchema);
