const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-lazarus');

const { Schema } = mongoose;

const IngredientSchema = Schema({
  ingredientId: Schema.Types.ObjectId,
  name: {
    type: String,
    minlength: [2, 'Name must be longer than 2 characters.'],
    required: [true, 'Name is required'],
  },
  type: {
    type: String,
    minlength: [2, 'Type must be longer than 2 characters.'],
    required: [true, 'Type is required'],
  },
}, { collation: { locale: 'en_US', strength: 1 }, timestamps: true });

IngredientSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Ingredient', IngredientSchema);