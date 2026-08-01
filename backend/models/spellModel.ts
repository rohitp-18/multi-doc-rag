import mongoose from "mongoose";



const SpellModel = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  suggestions: {
    type: [String],
    required: true,
  },
  correctedText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Spell = mongoose.model("Spell", SpellModel);

export default Spell;