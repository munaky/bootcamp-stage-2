import express from "express";
import { errorHandler } from "./middlewares/error-handler-middleware";
import { updateStock, getStock } from "./controllers/stock-controller";
import { getSuppliers } from "./controllers/supplier-controller";

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/suppliers', getSuppliers);
app.get('/api/stock/get/:id', getStock);
app.post("/api/suppliers/stock", updateStock);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
