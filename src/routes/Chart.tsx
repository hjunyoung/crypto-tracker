import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';
import { readBuilderProgram } from 'typescript';

interface IChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = () => {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexCharts
          type="line"
          series={[{ name: 'price', data: data?.map((price) => price.close) }]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              toolbar: { show: false },
              background: 'transparent',
            },
            stroke: {
              curve: 'smooth',
              lineCap: 'square',
              width: 3,
            },
            grid: {
              strokeDashArray: 5,
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            yaxis: {
              axisBorder: {
                show: true,
              },
              // decimalsInFloat: 2,
              labels: {
                formatter: (value) => value.toFixed(2),
              },
            },
            xaxis: {
              type: 'category',
              categories: data?.map((price) => price.time_close),
              tickAmount: 7,
              tickPlacement: 'between',
              labels: {
                rotate: 0,
                formatter: (value) => value.slice(5, 10),
              },
              tooltip: {
                enabled: false,
              },
            },
            colors: ['#0be881'],
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: ['#0fbcf9'],
                stops: [0, 100],
              },
            },
            tooltip: {
              x: {
                formatter: (value) => `${String(value).slice(0, 10)}`,
              },
              y: { formatter: (value) => `$${value.toFixed(2)}` },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
