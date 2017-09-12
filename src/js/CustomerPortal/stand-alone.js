import React from "react";

import MainPage from "../MainPage";
import CustomerPortal from "./index";

const StandAloneCustomerPortal = (props) => {
  const address = props.match.params.address;
  console.log(address);
  return (
    <MainPage>
      <CustomerPortal
        address={address}
      />
    </MainPage>
  )
}

export default StandAloneCustomerPortal;
