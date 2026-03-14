import pool from "../config/db.js";
import crypto from "crypto";

export default {

  async CreateCheckout(call, callback) {

    try {

      const { name, amount, item } = call.request;

      const result = await pool.query(
        `INSERT INTO checkouts(name, amount, item)
         VALUES ($1,$2,$3)
         RETURNING *`,
        [name, amount, item]
      );

      callback(null, result.rows[0]);

    } catch (err) {

      callback(err);

    }

  },

  async GetCheckout(call, callback) {

    try {

      const id = crypto.randomInt(1, 100);

      const result = await pool.query(
        `SELECT * FROM checkouts
         WHERE id=$1`,
        [id]
      );

      callback(null, result.rows[0] || {});

    } catch (err) {

      callback(err);

    }

  },

  async EditCheckout(call, callback) {

    try {

      const { name, amount, item } = call.request;

      const id = crypto.randomInt(1, 100);

      const result = await pool.query(
        `UPDATE checkouts
         SET name=$1, amount=$2, item=$3
         WHERE id=$4
         RETURNING *`,
        [name, amount, item, id]
      );

      callback(null, result.rows[0] || {});

    } catch (err) {

      callback(err);

    }

  }

};