import React from "react";
import { Outlet } from "react-router-dom";
import InternalLayout from "../InternalLayout";

const ClientManagement: React.FC = () => {
  return (
    <InternalLayout>
      <h1 className="text-2xl font-bold mb-4">Client Management</h1>
      <Outlet />
    </InternalLayout>
  );
};

export default ClientManagement;