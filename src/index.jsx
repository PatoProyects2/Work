import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster, ToastBar, toast } from 'react-hot-toast';
import { MainLayout } from './components/layout/MainLayout'
import Main from './views/main/Main'
import MainAbout from './views/main/components/about/About'
import MainRewards from './views/main/components/rewards/Rewards'
import MainProfile from './views/main/components/profile/Profile'
import { RpsLayout } from './components/layout/RpsLayout'
import Rps from './views/rps/Rps'
import RpsAbout from './views/rps/components/about/About'
import Nfts from './views/main/components/nfts/Nfts';
import FairPlay from './views/main/components/fairplay/Fairplay';
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import './index.scss'
import Fairplay from './views/main/components/fairplay/Fairplay';


ReactDOM.render(
  <BrowserRouter>
    <Toaster
      position="top-left"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      className='toast-modal'
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: 'rgba(28, 31, 35, 1)',
          color: 'whitesmoke'
        },
        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <span className='toast-close' onClick={() => toast.dismiss(t.id)}><i className='fa-solid fa-xmark fa-lg'></i></span>  
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Main />} />
        <Route path="profile" element={<MainProfile />} />
        <Route path="rewards" element={<MainRewards />} />
        <Route path="about" element={<MainAbout />} />
        <Route path="nfts" element={<Nfts />} />
        <Route path="fair-play" element={<Fairplay />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
      <Route path="/rps" element={<RpsLayout />}>
        <Route index element={<Rps />} />
        <Route path="about" element={<RpsAbout />} />
        <Route path="*" element={<Navigate replace to="/rps" />} />
      </Route>
    </Routes>
  </BrowserRouter >,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();