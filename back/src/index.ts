import { server } from "./Server/Server";
const port = process.env.PORT
;


server.listen(port, () => {
    console.log(`Servidor rodando da porta ${port}`)
});