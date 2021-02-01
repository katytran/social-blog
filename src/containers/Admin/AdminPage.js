import React from "react";
import AdminTabs from "../../components/AdminTabs";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      
    </div>
  );
};

export default AdminPage;
