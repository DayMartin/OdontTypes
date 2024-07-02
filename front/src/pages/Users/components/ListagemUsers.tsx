import { UsersService } from "../../../shared/services/api/Users/UsersService"
import * as React from "react";
import { BarraUsuarios } from "../../../shared/components";
import { Box } from "@mui/material";

// eslint-disable-next-line
export const ListagemUsers: React.VFC = () => {


    const consultar = async () => {
    
        const consulta = await UsersService.getAll()
        console.log(consulta)
    }
    return( 
        <Box>
            <BarraUsuarios/>
            <button onClick={() => consultar()}></button>
        </Box>

     )
}