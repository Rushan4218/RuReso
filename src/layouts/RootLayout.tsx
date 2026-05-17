import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { MicProvider } from "../providers/MicProvider";

const RootLayout = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="min-h-[calc(100vh-5rem)] w-full">
        <div className="mx-auto px-16 size-full max-w-7xl py-12">
          <MicProvider>
            <Outlet />
          </MicProvider>
        </div>
      </div>
    </main>
  );
};

export { RootLayout };
