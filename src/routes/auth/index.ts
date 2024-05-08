import jwt from "jsonwebtoken";
import { Router } from "express";
import { jwt_secret_key, messages } from "@utils";
import { queries } from "@queries";
import connection from "@config";
var bcrypt = require('bcryptjs');
const auth = Router();

auth.post("/login", (req, res) => {
  const { email, passwd } = req.body;
  const sql = queries.auth.login;

  connection.query(sql, [email], async (err, result) => {
    if (err) {
      console.error(messages.Error.ConnectionDB, err);
      return res.json({ message: messages.Error.source });
    }
    try {
      if (result.length > 0) {
        const hashedPassword = result[0].passwd;
        // Comparar a senha fornecida com o hash armazenado
        const passwordMatch = await bcrypt.compare(passwd, hashedPassword);

        if (passwordMatch) {
          const { id, nome, email, passwd } = result[0];
          const token = jwt.sign({ id, nome, email }, jwt_secret_key, {
            expiresIn: "24h",
          });

          return res.json({
            Login: true,
            token,
            data: { id, nome, email, passwd },
            message: messages.Success.source,
          });
        } else {
          return res.json({ message: messages.Error.auth.WrongPasswd });
        }
      } else {
        return res.json({ message: messages.Error.auth.NotFound });
      }
    } catch (error) {
      console.error(messages.Error.auth.NotFound, error);
      return res.json({ message: messages.Error.DuringJob });
    }
  });
});

auth.post("/signup", async (req, res) => {
  const { nome, email, passwd } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(passwd, saltRounds);
    const sql = queries.auth.signUp;
    connection.query(sql, [nome, email, hashedPassword], (err, data) => {
      if (err) {
        console.error(messages.Error.executingQuery, err);
        return res.json({ message: messages.Error.source });
      }
      return res.json({ message: messages.Success.source, data });
    });
  } catch (error) {
    console.error(messages.Error.DuringJob, "hashing", error);
    return res.json({ message: messages.Error.source });
  }
});

export default auth;