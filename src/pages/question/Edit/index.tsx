import React, { FC } from "react";
import { useDispatch } from "react-redux";
import useLoadeQuestionData from "../../../hooks/useLoadeQuestionData";

import EditCanvas from "./EditCanvas";
import LeftPanel from "./LeftPanel";
import { changeSelectedId } from "../../../store/componentsReducer";
import styles from "./index.module.scss";

const Edit: FC = () => {
  const { loading } = useLoadeQuestionData();
  const dispatch = useDispatch();

  function clearSelectedId() {
    dispatch(changeSelectedId(""));
  }

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: "#fff", height: "50px" }}>header</div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
