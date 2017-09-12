import React from "react";

import MainPage from "../MainPage";
import AdminPortal from "./index";

const StandAloneAdminPortal = (props) => {
  return (
    <MainPage>
      <AdminPortal />
    </MainPage>
  )
}

export default StandAloneAdminPortal;
