import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import { useState } from 'react';

const Container = styled.div`
  text-align: center;
`;

const ChartBtns = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
`;

const ChartBtn = styled.button<{ isSelected: boolean }>`
  ${(props) => props.theme.buttonStyle};
  background-color: ${(props) => props.theme.sectionColor};
  color: ${(props) =>
    props.isSelected ? props.theme.accentColor : props.theme.textColor};
  font-size: 12px;

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
interface IChartProps {
  coinId: string;
  isDark: boolean;
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
  const isDark = useRecoilValue(isDarkAtom);
  const [isLine, setIsLine] = useState(true);
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <Container>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <>
          <ChartBtns>
            <ChartBtn isSelected={isLine} onClick={() => setIsLine(true)}>
              Line Chart
            </ChartBtn>
            <ChartBtn isSelected={!isLine} onClick={() => setIsLine(false)}>
              CandleStick Chart
            </ChartBtn>
          </ChartBtns>
          <ApexCharts
            type={isLine ? 'line' : 'candlestick'}
            series={
              isLine
                ? [{ name: 'price', data: data?.map((price) => price.close) }]
                : [
                    {
                      name: 'price',
                      data: data?.map((price) => {
                        return {
                          x: price.time_close,
                          y: [price.open, price.high, price.low, price.close],
                        };
                      }),
                    },
                  ]
            }
            options={{
              theme: {
                mode: isDark ? 'dark' : 'light',
              },
              chart: {
                toolbar: { show: false },
                background: 'transparent',
              },
              stroke: {
                curve: 'smooth',
                lineCap: 'square',
                width: isLine ? 3 : 1,
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
                type: isLine ? 'gradient' : 'solid',
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
                marker: {
                  show: false,
                },
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: '#3C90EB',
                    downward: '#DF7D46',
                  },
                },
              },
            }}
          />
        </>
      )}
    </Container>
  );
};

export default Chart;

{
  /*  */
}

{
  /* <ApexCharts
            type="line"
            series={[
              { name: 'price', data: data?.map((price) => price.close) },
            ]}
            options={{
              theme: {
                mode: isDark ? 'dark' : 'light',
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
          /> */
}
