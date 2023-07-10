import express from "express";
import morgan from "morgan";

import productoRoutes from "./routes/producto.routes";
import usuarioRoutes from "./routes/usuario.routes";
import ventaRoutes from "./routes/venta.routes";
import carroRoutes from "./routes/carro.routes";
import stockRoutes from "./routes/stock.routes";

const app = express();

//Settings
app.set("port", 4000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/carritos", carroRoutes);
app.use("/api/productos-stocks", stockRoutes);

export default app;
