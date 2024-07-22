import { Box } from "@mui/material"
import { UsersService } from "../../../shared/services/api/Users/UsersService"
import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate, useSearchParams } from 'react-router-dom';


// eslint-disable-next-line
export const BarraUsuarios: React.VFC = () => {

    const navigate = useNavigate();



    const consultar = async () => {
    
        const consulta = await UsersService.getAll()
        console.log(consulta)
    }
    return( 
        // <Box>
        //     <button onClick={() => consultar()}></button>
        // </Box>
        <Grid container spacing={4} marginLeft={'6%'}>
        <Grid item xs={12} sm={2}>
        <Card
        sx={{
          minWidth: 12,
          backgroundColor: "#F0F8FF",
          boxShadow: "none",
          borderRadius: 6,
          cursor: "pointer", // Adicionado para indicar que o card é clicável
        }}
        onClick={() => navigate(`/paciente`)} // onClick adicionado ao Card
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ fontSize: 22, textAlign: "center", margin: "auto" }}
            color="text.secondary"
            gutterBottom
          >
            Paciente
          </Typography>
          <img
            className="icone"
            src="https://raw.githubusercontent.com/DayMartin/OdontTypes/main/front/public/earning.png"
            alt="Ícone"
          />
        </CardContent>
      </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Card
            sx={{
              minWidth: 10,
              backgroundColor: "#F5F5DC",
              boxShadow: "none",
              borderRadius: 6,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography
                sx={{ fontSize: 22, textAlign: "center", margin: "auto" }}
                color="text.secondary"
                gutterBottom
              >
                Médico
              </Typography>
              <img
                className="icone"
                src="https://raw.githubusercontent.com/DayMartin/OdontTypes/main/front/public/agenda.png"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Card
            sx={{
              minWidth: 10,
              backgroundColor: "#FFDAB9",
              boxShadow: "none",
              borderRadius: 6,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography
                sx={{ fontSize: 22, textAlign: "center", margin: "auto" }}
                color="text.secondary"
                gutterBottom
              >
                Funcionário
              </Typography>
              <img
                className="icone"
                src="https://raw.githubusercontent.com/DayMartin/OdontTypes/main/front/public/orcamento.png"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Card
            sx={{
              minWidth: 10,
              backgroundColor: "#FFF5EE",
              boxShadow: "none",
              borderRadius: 6,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography
                sx={{ fontSize: 22, textAlign: "center", margin: "auto" }}
                color="text.secondary"
                gutterBottom
              >
                Convênio
              </Typography>
              <img
                className="icone"
                src="https://raw.githubusercontent.com/DayMartin/OdontTypes/main/front/public/agenda.png"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Card
            sx={{
              minWidth: 10,
              backgroundColor: "#FFF5EE",
              boxShadow: "none",
              borderRadius: 6,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography
                sx={{ fontSize: 22, textAlign: "center", margin: "auto" }}
                color="text.secondary"
                gutterBottom
              >
                Fornecedores
              </Typography>
              <img
                className="icone"
                src="https://raw.githubusercontent.com/DayMartin/OdontTypes/main/front/public/agenda.png"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
     )
}