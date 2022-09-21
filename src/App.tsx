import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { FC, lazy, Suspense } from "react";
import Loader from "./components/UI/Loader/Loader";
import Home from "./pages/Home/Home";

const SignUp = lazy(
  () => import(/* webpackChunkName: "SignUp" */ "./pages/SignUp/SignUp")
);
const SignIn = lazy(
  () => import(/* webpackChunkName: "SignUp" */ "./pages/SignIn/SignIn")
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound/NotFound")
);

const App: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<MainLayout />}>
        <Route
          path={"register"}
          element={
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path={"login"}
          element={
            <Suspense fallback={<Loader />}>
              <SignIn />
            </Suspense>
          }
        />
        <Route path={"home"} element={<Home />} />
        <Route
          path={"notFound"}
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          }
        />
        <Route path={""} element={<Home />} />
      </Route>
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
};

export default App;
