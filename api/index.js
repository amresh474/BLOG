import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();




const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});




app.listen(process.env.PORT, () => {
    console.log(`server start at port ${process.env.PORT}`);
  });