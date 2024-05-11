import * as React from 'react';
import Chart from 'chart.js/auto';

export const Dashboard = () => {
    const chart1Ref = React.useRef<HTMLCanvasElement>(null);
    const chart2Ref = React.useRef<HTMLCanvasElement>(null);
    const chart3Ref = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const createChart = (ctx: CanvasRenderingContext2D, data: number[]) => {
            return new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
                    datasets: [{
                        label: 'Lucro',
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
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

        if (chart1Ref.current) {
            chart1Instance = createChart(chart1Ref.current.getContext('2d')!, [1000, 1500, 2000, 1800, 2200, 2500]);
        }
        if (chart2Ref.current) {
            chart2Instance = createChart(chart2Ref.current.getContext('2d')!, [800, 1200, 1500, 1400, 1800, 2000]);
        }
        if (chart3Ref.current) {
            chart3Instance = createChart(chart3Ref.current.getContext('2d')!, [1200, 1700, 1900, 1600, 2000, 2300]);
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
    }, []);

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
        </div>
    );
}
