import { server } from "./Server/Server";
import { CreateTables } from "../src/Server/database/conn"

const port = process.env.PORT
;


server.listen(port, () => {
    console.log(`Servidor rodando da porta ${port}`)
});