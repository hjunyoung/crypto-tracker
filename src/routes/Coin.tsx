import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 480px;

  padding: 0 24px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 14vh;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.accentColor};
`;

// interface IRouteState {
//   name: string;
// }
// interface ILocation {
//   state: IRouteState;
// }

interface ILocation {
  state: {
    name: string;
  };
}

const Coin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  const { coinId } = useParams();
  const { state } = useLocation() as ILocation;

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setIsLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name ?? 'Loading...'}</Title>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

export default Coin;
