import React from "react";
import { useParams } from "react-router-dom";

const Repository = () => {
  const { name } = useParams();

  return (
    <div
      style={{
        color: "white",
      }}
    >
      Repositório: {name}
    </div>
  );
};

export default Repository;
