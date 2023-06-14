import { getConnection } from "../database/database";

const getCarros = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("SELECT * FROM CartItem");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getCarro = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const [result] = await connection.query(
      "SELECT * FROM CartItem WHERE id = ?",
      [id]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addCarro = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    console.log(user_id, product_id, quantity);

    if (user_id == null || product_id == null || quantity == null) {
      return res
        .status(400)
        .json({ msg: "Por favor ingrese todos los campos" });
    }

    const carro = {
      user_id,
      product_id,
      quantity,
      is_active: 1,
    };

    const connection = await getConnection();
    await connection.query("INSERT INTO CartItem SET ?", [carro]);
    res.json({ msg: "Carro agregado exitosamente" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateCarro = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, product_id, quantity } = req.body;
    const connection = await getConnection();
    await connection.query(
      "UPDATE CartItem SET user_id = ?, product_id = ?, quantity = ? WHERE id = ?",
      [user_id, product_id, quantity, id]
    );
    res.json({ msg: "Carro actualizado exitosamente" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteCarro = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    await connection.query("DELETE FROM CartItem WHERE id = ?", [id]);
    res.json({ msg: "Carro eliminado exitosamente" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getCarros,
  getCarro,
  addCarro,
  updateCarro,
  deleteCarro,
};
