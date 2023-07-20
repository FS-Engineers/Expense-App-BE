const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    accountId: { type: String, required: true },
    amount: { type: Number, required: true },
    vendor: String,
    category: { type: String, required: true},
    subcategory: String,
    wns: String
})

module.exports = mongoose.model('Transaction', transactionSchema);