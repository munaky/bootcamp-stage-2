import express from "express";
import pointRoutes from './routes/point-routes'
import { errorHandler } from "./middlewares/error-handler-middleware";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/point", pointRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
