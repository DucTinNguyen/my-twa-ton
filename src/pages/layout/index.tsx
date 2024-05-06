import Header from "components/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="bg-[#fff4de] min-h-screen h-full">
        <Header />
      <section className="max-w-[1440px] mx-auto py-10">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
