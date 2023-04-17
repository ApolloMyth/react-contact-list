import { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages";
import { Loader } from "./components";
import { MainLayout } from "./layouts";

const SignIn = lazy(() =>
  import("./pages").then((module) => ({ default: module.SignIn }))
);
const SignUp = lazy(() =>
  import("./pages").then((module) => ({ default: module.SignUp }))
);
const NotFound = lazy(() =>
  import("./pages").then((module) => ({ default: module.NotFound }))
);

export const App: FC = () => {
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
