
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';

import {
  Home, Contas
} from '../pages';
import React from 'react';
import { ListagemUsers } from '../pages/Users/components/ListagemUsers';
import { Paciente } from '../pages/Users/components/Paciente';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();


  useEffect(() => {
    setDrawerOptions([

      {
        icon: 'assignment',
        path: "/nada",
        label: 'Work Prod',
      },

      /*
      {
        icon: 'assignment',
        path: "/usersListagem",
        label: 'Listagem de Usuarios',
      }, */
      
    ]);
  }, [setDrawerOptions]);

    // Simula a obtenção das roles do usuário ao carregar a página
    useEffect(() => {
      // Obtém as roles do usuário do localStorage ou de alguma fonte de dados

    }, []);
  

  return (
    <Routes>
      <Route path="/home" />
      <Route
        path="/listagemContas"
        element={
            <ListagemUsers />
        }
      />
      <Route
        path="/paciente"
        element={
            <Paciente />
        }
      />
      {/* Rota padrão */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};