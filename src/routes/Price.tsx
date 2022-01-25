import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;

  border: 1px solid ${(props) => props.theme.sectionColor};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 8px 40px;
  margin-bottom: 8px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.sectionColor};
  }
`;

const PriceName = styled.span``;

const PriceValue = styled.span`
  display: block;
  width: 40%;
  text-align: start;
`;
interface IPrice {
  ath_date: string;
  ath_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_1h: number;
  percent_change_1y: number;
  percent_change_6h: number;
  percent_change_7d: number;
  percent_change_12h: number;
  percent_change_15m: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: IPrice;
  };
}

interface IPriceProps {
  priceData: IPriceData;
}

const Price = () => {
  const { priceData } = useOutletContext<IPriceProps>();
  return (
    <Container>
      <PriceItem>
        <PriceName>Current Price: </PriceName>
        <PriceValue>${priceData.quotes.USD.price.toFixed(4)}</PriceValue>
      </PriceItem>
      <PriceItem>
        <PriceName>Market Cap: </PriceName>
        <PriceValue>${priceData.quotes.USD.market_cap}</PriceValue>
      </PriceItem>
      <PriceItem>
        <PriceName>Highest Price: </PriceName>
        <PriceValue>${priceData.quotes.USD.ath_price.toFixed(4)}</PriceValue>
      </PriceItem>
      <PriceItem>
        <PriceName>Percent Change: </PriceName>
        <PriceValue>{priceData.quotes.USD.percent_change_24h}%</PriceValue>
      </PriceItem>
    </Container>
  );
};

export default Price;
