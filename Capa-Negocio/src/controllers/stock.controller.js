import { getConnection } from "../database/database";

const getStocks = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query(
      "SELECT id AS id_producto, stock FROM almacen_producto"
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getStock = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const [result] = await connection.query(
      "SELECT id AS id_producto, stock FROM almacen_producto WHERE id = ?",
      [id]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    if (stock == null) {
      return res
        .status(400)
        .json({ msg: "Por favor ingrese todos los campos" });
    }
    const connection = await getConnection();
    await connection.query(
      "UPDATE almacen_producto SET stock = ? WHERE id = ?",
      [stock, id]
    );
    res.json({ message: "Stock actualizado" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    await connection.query("UPDATE almacen_producto SET stock = 0 WHERE id = ?", [
      id,
    ]);
    res.json({ message: "Stock eliminado" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getStocks,
  getStock,
  updateStock,
  deleteStock,
};
