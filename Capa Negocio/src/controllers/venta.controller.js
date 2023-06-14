import { getConnection } from "../database/database";

const getVentas = async (req, res) => {
    try {
        const connection = await getConnection();
        const [result] = await connection.query("SELECT * FROM orders_order");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query(
            "SELECT * FROM orders_order WHERE id = ?",
            [id]
        );
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addVenta = async (req, res) => {
    try {
        const {
            direccion,
            pais,
            ciudad,
            comuna,
            orden_notas,
            total_orden,
            tax,
            user_id
        } = req.body;

        if (
            direccion == null ||
            pais == null ||
            ciudad == null ||
            comuna == null ||
            orden_notas == null ||
            total_orden == null ||
            tax == null ||
            user_id == null
        ) {
            return res
                .status(400)
                .json({ msg: "Por favor ingrese todos los campos" });
        }
        const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        let order = `${currentYear}${currentMonth}${currentDay}${user_id}`;

        const connection = await getConnection();
        let [user] = await connection.query("SELECT * FROM cuenta_cuenta WHERE id = ?", [user_id]);
        if (user.length === 0) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        user = user[0];

        const fulldate = new Date().toISOString().slice(0, 19).replace("T", " ");
        const venta = {
            order_number: order,
            direccion,
            pais,
            ciudad,
            comuna,
            orden_notas,
            total_orden,
            tax,
            user_id,
            nombre: user.nombre,
            apellido: user.apellido,
            telefono: user.telefono,
            email: user.email,
            status: "Nuevo",
            ip_address: req.ip,
            is_ordered: 1,
            created_at: fulldate,
            updated_at: fulldate
        };


        const [result] = await connection.query("INSERT INTO orders_order SET ?", [venta]);
        res.json({ msg: "Venta agregada exitosamente", id: result.insertId });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateVenta = async (req, res) => {
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    try {
        const { id } = req.params;
        const {
            direccion,
            pais,
            ciudad,
            comuna,
            orden_notas,
            total_orden,
            tax,
            status
        } = req.body;

        if (
            direccion == null ||
            pais == null ||
            ciudad == null ||
            comuna == null ||
            orden_notas == null ||
            total_orden == null ||
            tax == null ||
            status == null
        ) {
            return res
                .status(400)
                .json({ msg: "Por favor ingrese todos los campos" });
        }

        const venta = {
            direccion,
            pais,
            ciudad,
            comuna,
            orden_notas,
            total_orden,
            tax,
            status,
            updated_at: date
        };

        const connection = await getConnection();
        await connection.query("UPDATE orders_order SET ? WHERE id = ?", [
            venta,
            id
        ]);
        res.json({ msg: "Venta actualizada exitosamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("DELETE FROM orders_order WHERE id = ?", [id]);
        res.json({ msg: "Venta eliminada exitosamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getVentas,
    getVenta,
    addVenta,
    updateVenta,
    deleteVenta
};