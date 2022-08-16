import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Route, Routes, Navigate, HashRouter } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Spinner from "./components/Spinner/Spinner";
// import TestLayout from "./components/Layout/TestLayout";

const Main = lazy(() => import("./views/Main/Main"));
const RPS = lazy(() => import("./views/RPS/RPS"));
const RPSDemo = lazy(() => import("./views/RPSDemo/RPSDemo"));
const Nfts = lazy(() => import("./views/Nfts/Nfts"));
const FairPlay = lazy(() => import("./views/FairPlay/FairPlay"));
const About = lazy(() => import("./views/About/About"));
const Stats = lazy(() => import("./views/Stats/Stats"));
const RefundPolicy = lazy(() => import("./views/RefundPolicy/RefundPolicy"));
const Terms = lazy(() => import("./views/Terms/Terms"));
// import Maintenance from "./views/Maintenance/Maintenance";
import ScrollToTop from "./hooks//ScrollToTop";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Spinner />}>
                <Main />
              </Suspense>
            }
          />
          <Route
            path="rps"
            element={
              <Suspense fallback={<Spinner />}>
                <RPS />
              </Suspense>
            }
          />
          <Route
            path="demo"
            element={
              <Suspense fallback={<Spinner />}>
                <RPSDemo />
              </Suspense>
            }
          />
          <Route
            path="nfts"
            element={
              <Suspense fallback={<Spinner />}>
                <Nfts />
              </Suspense>
            }
          />
          <Route
            path="fair-play"
            element={
              <Suspense fallback={<Spinner />}>
                <FairPlay />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<Spinner />}>
                <About />
              </Suspense>
            }
          />
          <Route path="stats">
            <Route
              index
              element={
                <Suspense fallback={<Spinner />}>
                  <Stats />
                </Suspense>
              }
            />
            <Route
              path=":urlParams"
              element={
                <Suspense fallback={<Spinner />}>
                  <Stats />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="refund-policy"
            element={
              <Suspense fallback={<Spinner />}>
                <RefundPolicy />
              </Suspense>
            }
          />
          <Route
            path="terms"
            element={
              <Suspense fallback={<Spinner />}>
                <Terms />
              </Suspense>
            }
          />
        </Route>

        {/* <Route path="/" element={<TestLayout />}>
            <Route index element={<Maintenance />} />
          </Route> */}

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </ScrollToTop>
  </HashRouter>
);
