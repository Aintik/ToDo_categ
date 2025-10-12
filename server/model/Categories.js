const { model, Schema } = require('mongoose');

module.exports = model('Category', new Schema({
  name: {
    type: String,
    required: true
  },
  list: [{
    title: {
      type: String
    },
    status: {
      type: Boolean,
      default: false
    }
  }],
  color: {
    type: String,
    default: '#777'
  },
  //TODO:
  userId: {
   type: Schema.ObjectId,
   ref:'User'
  }
  
}, {timestamps:true}))