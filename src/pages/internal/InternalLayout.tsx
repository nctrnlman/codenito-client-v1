import React from "react";
import Sidebar from "../../components/global/layouts/Sidebar";
import Topbar from "../../components/global/layouts/Topbar";

interface InternalLayoutProps {
  children: React.ReactNode;
}

const InternalLayout: React.FC<InternalLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-72">
        <Topbar />
        <main className="p-4 flex-1 mt-24 mr-4 rounded-3xl border border-black">
          {children}
        </main>
      </div>
    </div>
  );
};

export default InternalLayout;
