import express from "express";
import * as dotenv from "dotenv";
//import path from "path";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import propertyRouter from "./routes/property.routes.js";
//import { fileURLToPath } from 'url';
const PORT = process.env.PORT || 8080;
//const __filename = fileURLToPath(import.meta.url);

//const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

//app.use(express.static(path.join(__dirname, "../client/build")));
//app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "../client/build/index.html")) });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);

const startServer = async () => {
  try {
    // connect to the database...
    connectDB(process.env.MONGODB_URL);


    app.listen(PORT, () =>
      console.log(`Server Started on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
