const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8080;
const App = express();
//App middlewares
App.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
App.use(cors());
App.use(express.json({ limit: "100mb" }));

//App route

App.use("/api", require("./Routes/route"));
//App listen on port
App.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
