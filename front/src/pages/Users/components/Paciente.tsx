import { IApiResponse, IDetalheUsers, UsersService } from "../../../shared/services/api/Users/UsersService"
import * as React from "react";
import { BarraUsuarios } from "../../../shared/components";
import { useEffect, useMemo, useState } from 'react';

import {
    Icon,
    IconButton,
    LinearProgress,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    Dialog,
    Box,
    debounce,
  } from '@mui/material';
import { Environment } from "../../../shared/environment";
import { LayoutBaseDePagina } from "../../../shared/layouts";


// eslint-disable-next-line
export const Paciente: React.VFC = () => {

    const [rows, setRows] = useState<IApiResponse['consulta']>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOrdem, setSelectedOrdem] = useState<IApiResponse | null>(null);


    const consultar = async () => {
    
        const consulta = await UsersService.getAll()
        console.log(consulta)
    }

    useEffect(() => {
        setIsLoading(true);
    
        debounce(() => {
          const getCurrentPageData = async () => {
            try {              
              const result = await UsersService.getAll();
    
              if (result instanceof Error) {
                alert(result.message);
                setRows([]);
              } else {
                console.log('Dados recebidos:', result);
                setRows(result.id);
              }
              setIsLoading(false);
            } catch (error) {
              setIsLoading(false);
            }
          };
    
    
        });
      });
    return( 
        <LayoutBaseDePagina
      >
        <BarraUsuarios/>

        <TableContainer component={Paper}  sx={{ m: 1, width: 'auto', marginLeft: '6%', marginRight: '2%' }}>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>Id</TableCell>
                {/* <TableCell width={130}>Ações</TableCell> */}
                </TableRow>
            </TableHead>

            <TableBody>
                {isLoading ? (
                <TableRow>
                    <TableCell colSpan={1}>
                    <LinearProgress variant='indeterminate' />
                    </TableCell>
                </TableRow>
                ) : (
                rows.length === 0 ? (
                    <TableRow>
                    <TableCell colSpan={1}>
                        {Environment.LISTAGEM_VAZIA}
                    </TableCell>
                    </TableRow>
                ) : (
                    rows.map(row => (
                    <TableRow key={row.cpfcnpj}>
                        {/* <TableCell>
                        <IconButton size="small" onClick={() => handleDelete(row._id)}>
                            <Icon>delete</Icon>
                        </IconButton>
                        <IconButton size="small" onClick={() => navigate(`/ordemDetalhe/detalhe/${row._id}`)}>
                            <Icon>edit</Icon>
                        </IconButton>
                        <IconButton size="small" onClick={() => handleOpenDetalhesDialog(row)}>
                            <Icon>search</Icon>
                        </IconButton>
                        </TableCell> */}
                    </TableRow>
                    ))
                )
                )}

            </TableBody>
            </Table>
        </TableContainer>
      </LayoutBaseDePagina>
     )
}