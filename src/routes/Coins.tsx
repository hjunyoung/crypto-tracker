import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

const CoinsList = styled.ul``;

const Coin = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;

  background-color: white;
  color: ${(props) => props.theme.bgColor};
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 16px;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const CoinIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.accentColor};
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const coins = await (
        await fetch(`https://api.coinpaprika.com/v1/coins`)
      ).json();
      setCoins(coins.slice(0, 100));
      setIsLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Link key={coin.id} to={`/${coin.symbol}`}>
              <Coin>
                <CoinIcon
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt="coin icon"
                />
                <span>{coin.name} &rarr;</span>
              </Coin>
            </Link>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
