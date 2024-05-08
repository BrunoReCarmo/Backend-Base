import cors from "cors";
import express from "express";
import route from "@routes";
import { ServerKey } from "@middleware";

const app = express();

app.use(express.json());
//Conexão do FrontEnd
app.use(cors());
//rotas API
app.use(ServerKey, route);
//Bloco c/ a porta do servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });