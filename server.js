const express = require("express");
const cors = require("cors");
const db = require("./config/data-access");

const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.connectToDb();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require("./routes/to-do-lists.routes")(app);
require("./routes/to-do-list-shared.routes")(app);
require("./routes/to-do-items.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
