import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import { MixpanelProvider } from 'react-mixpanel-browser';
import MainLayout from './components/Layout/MainLayout'
import TestLayout from './components/Layout/TestLayout'
import Main from './views/Main/Main'
import RPS from './views/RPS/RPS'
import RPSDemo from './views/RPSDemo/RPSDemo'
import Nfts from './views/Nfts/Nfts';
import FairPlay from './views/FairPlay/FairPlay';
import About from './views/About/About'
import Stats from './views/Stats/Stats'
import RefundPolicy from './views/RefundPolicy/RefundPolicy';
import Terms from './views/Terms/Terms';
import Maintenance from './views/Maintenance/Maintenance';
import ScrollToTop from './hooks//ScrollToTop';
import * as serviceWorker from './serviceWorker'
import './index.scss'

ReactDOM.render(
  <MixpanelProvider>
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Main />} />
            <Route path="rps" element={<RPS />} />
            <Route path="demo" element={<RPSDemo />} />
            <Route path="nfts" element={<Nfts />} />
            <Route path="fair-play" element={<FairPlay />} />
            <Route path="about" element={<About />} />
            <Route path="stats" element={<Stats />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="terms" element={<Terms />} />
          </Route>

          {/* <Route path="/" element={<TestLayout />}>
            <Route index element={<Maintenance />} />
          </Route> */}

          <Route path="*" element={<Navigate replace to="/" />} />

        </Routes>
      </ScrollToTop>
    </BrowserRouter >
  </MixpanelProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();