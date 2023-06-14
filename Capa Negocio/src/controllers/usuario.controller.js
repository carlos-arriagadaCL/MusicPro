import { create } from "domain";
import { getConnection } from "../database/database";
import crypto from "crypto";

const encryptPassword = async (password) => {
    const algoritmo = "pbkdf2_sha256";
    const iteraciones = 600000;
    const salt = crypto.randomBytes(11).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, iteraciones, 32, "sha256")
        .toString("base64");
    const passwordHash = `${algoritmo}$${iteraciones}$${salt}$${hash}`;
    return passwordHash;
};

const getUsuarios = async (req, res) => {
  try {
    const connection = await getConnection();
    const [result] = await connection.query("SELECT * FROM cuenta_cuenta");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const [result] = await connection.query(
      "SELECT * FROM cuenta_cuenta WHERE id = ?",
      [id]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addUsuario = async (req, res) => {
  const date = new Date().toISOString().slice(0, 19).replace("T", " ");
  try {
    const {
      nombre,
      apellido,
      username,
      email,
      password,
      is_active,
      is_admin,
      is_staff,
      is_superadmin,
    } = req.body;

    if (
      nombre == null ||
      apellido == null ||
      email == null ||
      password == null
    ) {
      return res
        .status(400)
        .json({ msg: "Por favor ingrese todos los campos" });
    }

    const usuario = {
      nombre,
      apellido,
      username,
      email,
      password: await encryptPassword(password),
      fecha_creacion: date,
      ultimo_ingreso: date,
    };

    const connection = await getConnection();
    const [result] = await connection.query("INSERT INTO cuenta_cuenta SET ?", [usuario]);
    res.json({ msg: "Usuario creado exitosamente", id: result.insertId });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido,
      username,
      email,
      password
    } = req.body;

    if (
      nombre == null ||
      apellido == null ||
      username == null ||
      email == null ||
      password == null
    ) {
      return res
        .status(400)
        .json({ msg: "Por favor ingrese todos los campos" });
    }

    const usuario = {
        nombre,
        apellido,
        username,
        email,
        password: await encryptPassword(password),
    };

    const connection = await getConnection();
    await connection.query("UPDATE cuenta_cuenta SET ? WHERE id = ?", [
      usuario,
      id,
    ]);
    res.json({ msg: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    await connection.query("DELETE FROM cuenta_cuenta WHERE id = ?", [id]);
    res.json({ msg: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getUsuarios,
  getUsuario,
  addUsuario,
  updateUsuario,
  deleteUsuario,
};
