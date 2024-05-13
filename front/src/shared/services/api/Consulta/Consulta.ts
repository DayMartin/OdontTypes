import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemConsulta {
  servico_id: number;
  cliente_id: number;
  funcionario_id: number;
  convenio_id: number;
  QTparcelas: number;
  valorServico: number;
  valorDesconto: number;
  dataServico: string;
  horaServico: string;
  salaServico: string;
  status: string;
}

export interface IDetalheConsulta {
  id: number;
  servico_id: number;
  cliente_id: number;
  funcionario_id: number;
  convenio_id: number;
  QTparcelas: number;
  valorServico: number;
  valorDesconto: number;
  dataServico: string;
  horaServico: string;
  salaServico: string;
  status: string;
}

// type TConsultaComTotalCount = {
//   data: IListagemConsulta[];
//   totalCount: number;
// };

// const getAll = async (page = 1, filter = ''): Promise<TConsultaComTotalCount | Error> => {
//   try {
//     const urlRelativa = `${Environment.URL_BASE}/auth/register/${filter}?page=${page}`;

//     const { data } = await Api.get(urlRelativa);

//     if (data) {
//       return data;
//     }

//     return new Error('Erro ao listar os registros.');
//   } catch (error) {
//     console.error(error);
//     return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
//   }
// };

const getAll = async (page = 1, filter = ''): Promise<IDetalheConsulta | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/os/all`;

    const { data } = await Api.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getAllMes = async (page = 1, filter = ''): Promise<{ month: string, year: string, count: number }[] | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/os/totalmes`;

    const { data } = await Api.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};



const getById = async (id: string): Promise<IDetalheConsulta | Error> => {
  try {
    const { data } = await Api.get(`/auth/register/${id}`); 

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const getByEmail = async (email: string): Promise<IDetalheConsulta | Error> => {
  try {
    const { data } = await Api.get(`/auth/register/email?email=${email}`); 

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: Omit<IDetalheConsulta, 'id'>): Promise<number> => {
  try {
    const { data } = await Api.post<IDetalheConsulta>('/auth/register', dados);

    if (data) {
      return data.id;
    }

    throw new Error('Erro ao criar o registro.');
  } catch (error) {
    throw error;
  }
};

const updateById = async (id: string, dados: IDetalheConsulta): Promise<void | Error> => {
  try {
    await Api.put(`/auth/register/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/auth/register/${id}`); 
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const ConsultaService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  getByEmail,
  getAllMes
};
