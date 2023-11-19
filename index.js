import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./connectDB.js";
import userRoutes from "./routes/user.js";
import notesRoutes from "./routes/notes.js"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// app.use('/',(req, res) => {
//     res.send("This is a Notes Making Application!!!")
// })

app.use("/user",userRoutes );
app.use("/notes",notesRoutes );

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
