import React from 'react';
import './App.css';
import {MenuLateral} from './shared/components/menu-lateral/MenuLateral';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider, DrawerProvider } from './shared/contexts';


export const App = () => {
  return (

    <DrawerProvider>
    <BrowserRouter>
      <MenuLateral>
        <AppRoutes />
      </MenuLateral>
    </BrowserRouter>
  </DrawerProvider>

  );
}


