import { getConnection } from "../database/database";

const getProductos = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("SELECT * FROM almacen_producto");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const [result] = await connection.query(
      "SELECT * FROM almacen_producto WHERE id = ?",
      [id]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addProducto = async (req, res) => {
  const date = new Date().toISOString().slice(0, 19).replace("T", " ");
  try {
    const {
      nombre,
      slug,
      descripcion,
      precio,
      imagen,
      stock,
      is_available,
      categoria_id,
    } = req.body;

    if (
      nombre == null ||
      slug == null ||
      descripcion == null ||
      precio == null ||
      imagen == null ||
      stock == null ||
      is_available == null ||
      categoria_id == null
    ) {
      return res
        .status(400)
        .json({ msg: "Por favor ingrese todos los campos" });
    }

    const producto = {
      nombre,
      slug,
      descripcion,
      precio,
      imagen,
      stock,
      is_available,
      fecha_creacion: date,
      fecha_modificacion: date,
      categoria_id,
    };
    const connection = await getConnection();

    const [result] = await connection.query(
      "INSERT INTO almacen_producto SET ?",
      producto
    );
    res.json({ message: "Producto agregado", id: result.insertId });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    await connection.query("DELETE FROM almacen_producto WHERE id = ?", [id]);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateProducto = async (req, res) => {
  const date = new Date().toISOString().slice(0, 19).replace("T", " ");
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ msg: "El id debe ser un numero" });
    }
    const {
      nombre,
      slug,
      descripcion,
      precio,
      imagen,
      stock,
      is_available,
      categoria_id,
    } = req.body;

    if (
      nombre == null ||
      slug == null ||
      descripcion == null ||
      precio == null ||
      imagen == null ||
      stock == null ||
      is_available == null ||
      categoria_id == null
    ) {
      return res
        .status(400)
        .json({ msg: "Por favor ingrese todos los campos" });
    }

    const producto = {
      nombre,
      slug,
      descripcion,
      precio,
      imagen,
      stock,
      is_available,
      fecha_modificacion: date,
      categoria_id,
    };
    const connection = await getConnection();

    const [result] = await connection.query(
      "SELECT id FROM almacen_producto WHERE id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(400).json({ msg: "El producto no existe" });
    }

    await connection.query("UPDATE almacen_producto SET ? WHERE id = ?", [
      producto,
      id,
    ]);
    res.json({ message: "Producto actualizado" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getProductos,
  getProducto,
  addProducto,
  deleteProducto,
  updateProducto,
};
