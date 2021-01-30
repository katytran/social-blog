import React from "react";
import AdminTabs from "../../components/AdminTabs";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <h1>hello</h1>
      <AdminTabs />
    </div>
  );
};

export default AdminPage;
