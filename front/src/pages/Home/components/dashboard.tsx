import * as React from 'react';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';
import { ConsultaService, IListagemConsulta } from '../../../shared/services/api/Consulta/Consulta';

type ChartType = keyof ChartTypeRegistry;

const getMonthName = (month: number): string => {
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return monthNames[month - 1];
};

export const Dashboard = () => {
    const chart1Ref = React.useRef<HTMLCanvasElement>(null);
    const chart2Ref = React.useRef<HTMLCanvasElement>(null);
    const chart3Ref = React.useRef<HTMLCanvasElement>(null);

    const [data, setData] = React.useState<{ [key: string]: number }>({});

    const consulta = async () => {
        const response = await ConsultaService.getAllMes();
      
        if (response instanceof Error) {
            console.error(response.message);
            return;
        }
      
        // Extrair todos os meses disponíveis dos dados
        const meses = response.map(item => `${item.month}/${item.year}`);
        console.log('meses', meses)
      
        // Criar uma lista de meses e contagens
        const mesesContagens: { [key: string]: number } = {};
        meses.forEach(mes => {
            const [month, year] = mes.split('/'); // Dividir o mês e o ano
            const monthName = getMonthName(Number(month)); // Obter o nome do mês
            mesesContagens[`${monthName} ${year}`] = response.find(item => `${item.month}/${item.year}` === mes)?.count || 0;
        });
      
        setData(mesesContagens);
    }
    

    React.useEffect(() => {
        const createChart = (ctx: CanvasRenderingContext2D, data: number[], type: ChartType) => {
            return new Chart(ctx, {
                type: type,
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Lucro',
                        data: Object.values(data),
                        backgroundColor: type === 'pie' ? [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ] : 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        };

        let chart1Instance: Chart | null = null;
        let chart2Instance: Chart | null = null;
        let chart3Instance: Chart | null = null;
        console.log(data)

        

        if (chart1Ref.current) {
            chart1Instance = createChart(chart1Ref.current.getContext('2d')!, Object.values(data), 'bar');
        }
        if (chart2Ref.current) {
            chart2Instance = createChart(chart2Ref.current.getContext('2d')!, Object.values(data), 'pie');
        }
        if (chart3Ref.current) {
            chart3Instance = createChart(chart3Ref.current.getContext('2d')!, Object.values(data), 'bar');
        }

        return () => {
            // Destruir instâncias de gráficos ao desmontar o componente
            if (chart1Instance) {
                chart1Instance.destroy();
            }
            if (chart2Instance) {
                chart2Instance.destroy();
            }
            if (chart3Instance) {
                chart3Instance.destroy();
            }
        };
    }, [data]);

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <canvas ref={chart1Ref} width={400} height={300}></canvas>
            </div>
            <div>
                <canvas ref={chart2Ref} width={400} height={300}></canvas>
            </div>
            <div>
                <canvas ref={chart3Ref} width={400} height={300}></canvas>
            </div>

            <button onClick={() => consulta()}>Consultar dados </button>
        </div>
    );
}
