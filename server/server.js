const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
