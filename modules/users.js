var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Test', {useNewUrlParser: true, useUnifiedTopology: true});
var conn=mongoose.connection;

var usersSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    country: String,
    totalamount: Number,
    totalhours: Number,
    total: Number

  });

var usersModel = mongoose.model('users', usersSchema);
module.exports=usersModel;