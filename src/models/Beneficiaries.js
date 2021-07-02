const mongoose = require('mongoose');

const BeneficiariesSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  cpf: {
    type: String,
    require: true,
    unique: true
  },
  rg: {
    type: String,
    require: true,
    unique: true
  },
  birthday: {
    type: Date,
    require: true
  },
  plan: {
    type: String,
    require: true,
    enum: ['Basic', 'Standard', 'Premium']
  },
  dependents: {
    type: Number,
    require: false,
  },
});

module.exports = mongoose.model('Beneficiaries', BeneficiariesSchema);