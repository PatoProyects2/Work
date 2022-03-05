import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import { MainLayout } from './components/layout/MainLayout'
import Main from './views/main/Main'
import MainAbout from './views/main/components/about/About'
import MainRewards from './views/main/components/rewards/Rewards'
import MainProfile from './views/main/components/profile/Profile'
import { RpsLayout } from './components/layout/RpsLayout'
import Rps from './views/rps/Rps'
import RpsAbout from './views/rps/components/about/About'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import './index.scss'

ReactDOM.render( 
  <BrowserRouter>
    <ToastProvider newestOnTop={true} autoDismiss={true} autoDismissTimeout={7000} placement={'bottom-right'}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route path="profile" element={<MainProfile />} />
          <Route path="rewards" element={<MainRewards />} />
          <Route path="about" element={<MainAbout />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route> 
        <Route path="/rps" element={<RpsLayout />}>
          <Route index element={<Rps />} />
          <Route path="about" element={<RpsAbout />} />
          <Route path="*" element={<Navigate replace to="/rps" />} />
        </Route>
      </Routes>
    </ToastProvider>
  </BrowserRouter >,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

