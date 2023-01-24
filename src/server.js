require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const connect = require("./config/db");
const userRoute = require("./routes/user.route");
const adminRoute = require("./routes/admin.route");
const jobRoute = require("./routes/job.route");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRoute);
app.use("/admin", adminRoute);
app.use("/jobs", jobRoute);

app.listen(PORT, async () => {
  await connect();
  console.log(`running at ${PORT}`);
});
