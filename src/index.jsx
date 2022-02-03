import React from 'react';
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Layout } from './components/layout/Layout'
import Game from './views/game/Game'
import About from './views/about/About'
import Marketplace from './views/marketplace/Marketplace'
import Leaderboard from './views/leaderboard/Leaderboard'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import './index.scss'

function getLibrary(provider) {
  return new Web3(provider)
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Game />} />
          <Route path="about" element={<About />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Web3ReactProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

