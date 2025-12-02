import { Outlet, ScrollRestoration } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Outlet />

      <ScrollRestoration />
    </>
  );
};

export default RootLayout;
