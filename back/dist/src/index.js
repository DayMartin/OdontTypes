"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./Server/Server");
const port = 3048;
Server_1.server.listen(port, () => {
    console.log(`Servidor rodando da porta ${port}`);
});
//# sourceMappingURL=index.js.map