import express from "express";
import productRouter from "./routes/product-routes";
import orderRouter from './routes/order-routes'

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/product", productRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
  console.log("server is running");
});
