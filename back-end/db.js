const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const connectToMongo = ()=> {
  mongoose.connect("mongodb://127.0.0.1:27017/users", (err) => {
    if (err) console.log("CONNECTION ERROR: ", err);
    else console.log("MONGODB CONNECTED SUCCESSFULLY");
  });
}

module.exports = connectToMongo;