import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import { MixpanelProvider } from 'react-mixpanel-browser';
import { GlobalLayout } from './components/layout/GlobalLayout'
import { TestLayout } from './components/layout/TestLayout'
import Main from './views/main/Main'
import MainAbout from './views/main/components/about/About'
import MainProfile from './views/main/components/profile/Profile'
import Rps from './views/rps/Rps'
import Demo from './views/rps/Demo'
import Nfts from './views/main/components/nfts/Nfts';
import Fairplay from './views/main/components/fairplay/Fairplay';
import RefundPolicy from './views/main/refundPolicy/RefundPolicy';
import Terms from './views/main/terms/Terms';
import Maintenance from './views/status/Maintenance';
import ScrollToTop from './components/ui/ScrollToTop';
import * as serviceWorker from './serviceWorker'
import './index.scss'

ReactDOM.render(
  <MixpanelProvider>
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<GlobalLayout />}>
            <Route index element={<Main />} />
            <Route path="rps" element={<Rps />} />
            <Route path="nfts" element={<Nfts />} />
            <Route path="fair-play" element={<Fairplay />} />
            <Route path="about" element={<MainAbout />} />
            <Route path="profile" element={<MainProfile />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="demo" element={<Demo />} />
          </Route>

          {/* <Route path="/" element={<TestLayout />}>
            <Route index element={<Maintenance />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route> */}

          <Route path="*" element={<Navigate replace to="/" />} />

        </Routes>
      </ScrollToTop>
    </BrowserRouter >
  </MixpanelProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();