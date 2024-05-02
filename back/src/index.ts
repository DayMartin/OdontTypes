import { server } from "./Server/Server";

const port = 3048;

server.listen(port, () => {
    console.log(`Servidor rodando da porta ${port}`)
});