import React from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.scss";

type EditProps = {};

const Edit: React.FC<EditProps> = () => {
  const { id = '' } = useParams();
  return <div>Edit, {id}</div>;
};

export default Edit;
