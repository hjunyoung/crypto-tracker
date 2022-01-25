import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chart from './routes/Chart';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Price from './routes/Price';

interface IRouterProps {
  isDark: boolean;
  toggleDark: () => void;
}

const Router = ({ isDark, toggleDark }: IRouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Coins isDark={isDark} toggleDark={toggleDark} />}
        ></Route>
        <Route path="/:coinId" element={<Coin isDark={isDark} />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
