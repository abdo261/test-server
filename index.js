const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routers/auth");
const UserRouter = require("./routers/userRouter");
const taskRouter = require("./routers/task");
const assignementRouter = require("./routers/assignement");
const { PORT } = require("dotenv").config().parsed;
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/users", UserRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/assignements", assignementRouter);
require("./config/connection");
app.listen(PORT, () => console.log(`server raning in port ${PORT}`));
