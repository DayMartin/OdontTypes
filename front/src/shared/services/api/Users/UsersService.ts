import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IListagemUsers {
  tipo: string;
  cpfcnpj: string;
  nome: string;
  telefone: string;
  endereco: string;
  email: string;
  senha: string;
  status: string;
}

export interface IDetalheUsers {
  id: string;
  tipo: string;
  cpfcnpj: string;
  nome: string;
  telefone: string;
  endereco: string;
  email: string;
  senha: string;
  status: string;
}

export interface IApiResponse {
  consulta: IListagemUsers[]; 
  pagination: {
    totalOrdem: number;
    pageCount: number;
    next?: { page: number };
    prev?: { page: number };
  };
  setor?: string;
  status?: string | string[];
  sala?: string | string[];
  equipe?: string;
  solicitante?: string;
}

// type TUsersComTotalCount = {
//   data: IListagemUsers[];
//   totalCount: number;
// };

// const getAll = async (page = 1, filter = ''): Promise<TUsersComTotalCount | Error> => {
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

const getAll = async (page = 1, filter = ''): Promise<IDetalheUsers | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/user/all`;

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

const getById = async (id: string): Promise<IDetalheUsers | Error> => {
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

const getByEmail = async (email: string): Promise<IDetalheUsers | Error> => {
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

const create = async (dados: Omit<IDetalheUsers, 'id'>): Promise<string> => {
  try {
    const { data } = await Api.post<IDetalheUsers>('/auth/register', dados);

    if (data) {
      return data.id;
    }

    throw new Error('Erro ao criar o registro.');
  } catch (error) {
    throw error;
  }
};

const updateById = async (id: string, dados: IDetalheUsers): Promise<void | Error> => {
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

export const UsersService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  getByEmail,
};
