const mongoose = require("mongoose");
const DB = process.env.DATASTORE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection is established`);
  })
  .catch(() => console.log(`Connection is not established`));
