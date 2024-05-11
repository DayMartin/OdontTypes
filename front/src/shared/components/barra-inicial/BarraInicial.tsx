import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';

import Avatar from '@mui/material/Avatar';
import { TextField } from '@mui/material';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


export const BarraInicial = () => {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };


    return(
    <Box>
    <Grid container spacing={2}>
        <Typography sx={{ fontSize: 16, marginLeft: 2 }} color="#0d47a1" gutterBottom>
        Home
        </Typography>
    </Grid>
    <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}> 
        <Typography sx={{ 
            fontSize: 28, 
            marginLeft: 0, 
            marginTop: 2, 
            fontWeight: 'bold' }} color="#0d47a1" gutterBottom>
            DashBoard
        </Typography>
        </Grid>
        <Grid item xs={4}> 
        <div className="search-container">
            <input type="text" placeholder="Pesquisar..." className="search-input" />
            <button type="submit" className="search-button">
               <SearchIcon className='icone'/>
            </button>
            </div>

        </Grid>
        
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}> 
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Logo" src="https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2023/07/robo-humanoide-chines.png" sx={{ width: 56, height: 56 }} />
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
            ))}
        </Menu>
        </Grid>
    </Grid>
    </Box>

    )
}