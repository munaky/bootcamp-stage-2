import express from "express";
import postRoutes from './routes/post-routes'

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/posts", postRoutes);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
