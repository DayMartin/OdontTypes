import queryDatabase from '../database/queryPromise'

require("dotenv").config();

export class CreateTables{
    constructor() {}

	// Chamar as funções para criar as tabelas durante a inicialização do banco de dados
    async createAllTables() {
        try {
            await this.createUsuariosTable();
            await this.createServicosTable();
            await this.createOsTable();
            await this.createParcelasTable();
			await this.createCategoriaTable();
			await this.createEstoqueTable();
			await this.createHistoricEstoqueTable();
        } catch (error) {
            console.error("Erro ao criar as tabelas:", error);
        }
    }

	async createUsuariosTable() {
		try {
			const consulta = `SHOW TABLES LIKE 'usuarios'`;
			// Verifique se a tabela 'usuarios' existe
			const rows = await queryDatabase(consulta);
	
			// Se a tabela 'usuarios' não existir, crie-a
			if (rows.length === 0) {
				await queryDatabase(`
					CREATE TABLE usuarios (
						id INT AUTO_INCREMENT PRIMARY KEY,
						tipo VARCHAR(100),
						cpfcnpj VARCHAR(100),
						nome VARCHAR(100),
						telefone VARCHAR(100),
						endereco VARCHAR(100),
						email VARCHAR(100),
						senha VARCHAR(100),
						status VARCHAR(50),
						data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
					)
				`);
				console.log("Tabela 'usuarios' criada com sucesso.");
			}
		} catch (error) {
			console.error("Erro ao criar a tabela 'usuarios':", error);
		}
	}

	async createServicosTable() {
		try {
			// Verifique se a tabela 'servicos' existe
			const rows = await queryDatabase(
				`SHOW TABLES LIKE 'servicos'`
			);

			// Se a tabela 'servicos' não existir, crie-a
			if (rows.length === 0) {
				await queryDatabase(`
					CREATE TABLE servicos (
						id INT AUTO_INCREMENT PRIMARY KEY,
						nome VARCHAR(100),
						descricao VARCHAR(100),
						preco_avulso DECIMAL(10, 2),
						preco_convenio DECIMAL(10, 2),
						status VARCHAR(50),
						data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
					)
				`);
				console.log("Tabela 'servicos' criada com sucesso.");
			}
		} catch (error) {
			console.error("Erro ao criar a tabela 'servicos':", error);
		}
	}

	async createOsTable() {
		try {
			// Verifique se a tabela 'OS' existe
			const rows = await queryDatabase(
				`SHOW TABLES LIKE 'os'`
			);

			// Se a tabela 'Os' não existir, crie-a
			if (rows.length === 0) {
				await queryDatabase(`
					CREATE TABLE os (
						id INT AUTO_INCREMENT PRIMARY KEY,
						servico_id INT,
						cliente_id INT,
						funcionario_id INT,
						convenio_id INT,
						QTparcelas INT,
						valorServico DECIMAL(10, 2),
						valorDesconto DECIMAL(10, 2),
						dataServico VARCHAR(50),
						horaServico VARCHAR(50),
						salaServico VARCHAR(50),
						status VARCHAR(50),
						data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
						FOREIGN KEY (servico_id) REFERENCES servicos(id),
						FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
						FOREIGN KEY (funcionario_id) REFERENCES usuarios(id),
						FOREIGN KEY (convenio_id) REFERENCES usuarios(id)
					)
				`);
				console.log("Tabela 'os' criada com sucesso.");
			}

		} catch (error) {
			console.error("Erro ao criar a tabela 'os':", error);
		}
	}

	async createParcelasTable() {
		try {

			// Verifique se a tabela 'Parcelas' existe
			const rows = await queryDatabase(
				`SHOW TABLES LIKE 'parcelas'`
			);

			// Se a tabela 'Parcelas' não existir, crie-a
			if (rows.length === 0) {
				await queryDatabase(`
					CREATE TABLE parcelas (
						id INT AUTO_INCREMENT PRIMARY KEY,
						os_id INT,
						parcela INT,
						valorParcela DECIMAL(10, 2),
						dataPagamento VARCHAR(50),
						status VARCHAR(50),
						data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
						FOREIGN KEY (os_id) REFERENCES os(id)
					)
				`);
				console.log("Tabela 'Parcelas' criada com sucesso.");
			}

			// Libere a conexão
		} catch (error) {
			console.error("Erro ao criar a tabela 'Parcelas':", error);
		}
	}

	async createCategoriaTable() {
		try {
			const consulta = `SHOW TABLES LIKE 'categoria'`;
			// Verifique se a tabela 'Categoria' existe
			const rows = await queryDatabase(consulta);
	
			// Se a tabela 'Categoria' não existir, crie-a
			if (rows.length === 0) {
				await queryDatabase(`
					CREATE TABLE categoria (
						id INT AUTO_INCREMENT PRIMARY KEY,
						nome VARCHAR(100),
						data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
					)
				`);
				console.log("Tabela 'Categoria' criada com sucesso.");
			}
		} catch (error) {
			console.error("Erro ao criar a tabela 'Categoria':", error);
		}
	}

	async createEstoqueTable() {
		try {
			const consulta = `SHOW TABLES LIKE 'estoque'`;
			// Verifique se a tabela 'estoque' existe
			const rows = await queryDatabase(consulta);
	
			// Se a tabela 'estoque' não existir, crie-a
			if (rows.length === 0) {
				await queryDatabase(`
					CREATE TABLE estoque (
						id INT AUTO_INCREMENT PRIMARY KEY,
						nome VARCHAR(100),
						quantidade INT,
						fornecedor_id INT,
						categoria_id INT,
						data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
						FOREIGN KEY (fornecedor_id) REFERENCES usuarios(id),
						FOREIGN KEY (categoria_id) REFERENCES categoria(id)
					)
				`);
				console.log("Tabela 'estoque' criada com sucesso.");
			}
		} catch (error) {
			console.error("Erro ao criar a tabela 'estoque':", error);
		}
	}

	async createHistoricEstoqueTable() {
		try {
			const consulta = `SHOW TABLES LIKE 'estoqueHistoric'`;
			// Verifique se a tabela 'estoqueHistoric' existe
			const rows = await queryDatabase(consulta);
	
			// Se a tabela 'estoqueHistoric' não existir, crie-a
			if (rows.length === 0) {
				await queryDatabase(`
					CREATE TABLE estoqueHistoric (
						id INT AUTO_INCREMENT PRIMARY KEY,
						tipo VARCHAR(50),
						quantidade INT,
						estoque_id INT,
						data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
						FOREIGN KEY (estoque_id) REFERENCES estoque(id)
					)
				`);
				console.log("Tabela 'estoqueHistoric' criada com sucesso.");
			}
		} catch (error) {
			console.error("Erro ao criar a tabela 'estoqueHistoric':", error);
		}
	}
}
 
