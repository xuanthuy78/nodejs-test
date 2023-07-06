// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://phamthixuanthuy78:61897799NA%40@cluster0.3t0ua2k.mongodb.net/main"
);
mongoose.set("debug", true);

mongoose.model("User", mongoose.Schema({ name: String }));

const app = express();

app.get("/users", function (req, res) {
  const db = mongoose.connection.useDb(`main`, {
    // `useCache` tells Mongoose to cache connections by database name, so
    // `mongoose.connection.useDb('foo', { useCache: true })` returns the
    // same reference each time.
    useCache: true,
  });
  // Need to register models every time a new connection is created
  if (!db.models["User"]) {
    db.model("User", mongoose.Schema({ name: String }));
  }
  console.log("Find users from", db.name);
  db.model("User")
    .find()
    .then((users) => res.json({ users }))
    .catch((err) => res.status(500).json({ message: err.message }));
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
