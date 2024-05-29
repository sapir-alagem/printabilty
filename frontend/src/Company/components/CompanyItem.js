import React from "react";

const CompanyItem = (props) => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.printersCount}</td>
    </tr>
  );
};

export default CompanyItem;
