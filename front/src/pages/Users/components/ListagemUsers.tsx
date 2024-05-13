import { Box } from "@mui/material"
import { UsersService } from "../../../shared/services/api/Users/UsersService"

// eslint-disable-next-line
export const ListagemUsers: React.VFC = () => {


    const consultar = async () => {
    
        const consulta = await UsersService.getAll()
        console.log(consulta)
    }
    return( 
        <Box>
            <button onClick={() => consultar()}></button>
        </Box>
     )
}