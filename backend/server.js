// start server
import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config({ debug: true });

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server started at port 5000!!");
});
