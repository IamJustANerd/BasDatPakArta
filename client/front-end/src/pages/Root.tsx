import { Outlet } from "react-router-dom";

export default function Root() {
  const isComingSoon = false;
  return (
    <>
      <Outlet />
    </>
  );
}
