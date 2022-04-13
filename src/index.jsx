import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import { Toaster, ToastBar, toast } from 'react-hot-toast';
import { MixpanelProvider } from 'react-mixpanel-browser';
import { GlobalLayout } from './components/layout/GlobalLayout'
import Main from './views/main/Main'
import MainAbout from './views/main/components/about/About'
import MainProfile from './views/main/components/profile/Profile'
import Rps from './views/rps/Rps'
import Demo from './views/rps/Demo'
import RpsAbout from './views/rps/components/about/About'
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
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          className='toast-modal'
          toastOptions={{
            // Define default options
            className: 'mt-5',
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
            <Route path="about" element={<RpsAbout />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>

          {/* <Route index element={<Maintenance />} /> // Remplazarlo por la etiqueta Route de arriba */}

        </Routes>
      </ScrollToTop>
    </BrowserRouter >
  </MixpanelProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();