
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';

import { Dashboard, Home } from '../../../pages';
import { BarraInicial } from '../barra-inicial/BarraInicial';
import { Contas } from '../../../pages';
import { ListagemUsers } from '../../../pages/Users/components/ListagemUsers';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect } from "react";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(18)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(11)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 3),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MenuLateral() {
  const navigate = useNavigate();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('');

  useEffect(() => {
    if (selectedItem === 'Contas') {
      navigate('/paciente');
    }
  }, [selectedItem, navigate]);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const handleListItemClick = (text: React.SetStateAction<string>) => {
    setSelectedItem(text);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Divider />
        <List>
          {['Contas', 'Consultas', 'Financeiro', 'Estoque'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={selectedItem === text}
                onClick={() => handleListItemClick(text)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 5.5,
                  marginBottom: 6,
                  marginTop: 8,
                  fontSize: 30,
                  width: 70, 
                  height: 70
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                {index === 0 ? <PeopleOutlineIcon /> : index === 1 ? <LocalHospitalIcon /> : index === 2 ? <MonetizationOnIcon /> : <InventoryIcon />}
                                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Home'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={selectedItem === text}
                onClick={() => handleListItemClick(text)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 5.5,


                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 6 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <HomeIcon /> : <HomeIcon /> }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {selectedItem === 'Consultas' && (
            <Box sx={{ bgcolor: 'background.paper', p: 3 }}>
              <Typography variant="h5">Consultas</Typography>
              <Typography paragraph>
                Conteúdo para Consultas...
              </Typography>
            </Box>
          )}
        {selectedItem === 'Financeiro' && (
          <Box sx={{ bgcolor: 'background.paper', p: 3 }}>
            <Typography variant="h5">Financeiro</Typography>
            <Typography paragraph>
              Conteúdo para Financeiro...
            </Typography>
          </Box>
        )}
        {selectedItem === 'Estoque' && (
          <Box sx={{ bgcolor: 'background.paper', p: 3 }}>
            <Typography variant="h5">Estoque</Typography>
            <Typography paragraph>
              Conteúdo para Estoque...
            </Typography>
          </Box>
        )}
        {selectedItem === 'Home' && (
          <Box>
            <Box sx={{ bgcolor: 'background.paper', p: 3 }} className = 'grid'>
            <BarraInicial/>
            </Box>
            <Box sx={{ bgcolor: 'background.paper', p: 3 }} className = 'grid'>
            <Home/>
            </Box>
            <Box sx={{ bgcolor: 'background.paper', p: 3 }} className = 'grid'>
            <Dashboard/>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
