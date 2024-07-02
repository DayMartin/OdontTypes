import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import TodayIcon from "@mui/icons-material/Today";

// import Chart from 'chart.js/auto';

export const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <Card
          sx={{
            minWidth: 20,
            backgroundColor: "#F0F8FF",
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
              A receber hoje
            </Typography>
            <img
              className="icone"
              src="https://raw.githubusercontent.com/DayMartin/OdontTypes/main/front/public/earning.png"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card
          sx={{
            minWidth: 20,
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
              Agenda
            </Typography>
            <img
              className="icone"
              src="https://raw.githubusercontent.com/DayMartin/OdontTypes/main/front/public/agenda.png"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card
          sx={{
            minWidth: 20,
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
              Orçamento
            </Typography>
            <img
              className="icone"
              src="https://raw.githubusercontent.com/DayMartin/OdontTypes/main/front/public/orcamento.png"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card
          sx={{
            minWidth: 20,
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
              Word of the Day
            </Typography>
            <img
              className="icone"
              src="https://raw.githubusercontent.com/DayMartin/OdontTypes/main/front/public/agenda.png"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
