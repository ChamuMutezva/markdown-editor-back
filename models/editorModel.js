const mongoose = require('mongoose')
const Schema = mongoose.Schema

const editorSchema = new Schema({
  createdAt: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model('doc', editorSchema)