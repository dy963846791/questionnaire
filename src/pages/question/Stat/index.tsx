import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result, Spin } from "antd";
import useLoadeQuestionData from "../../../hooks/useLoadeQuestionData";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useTitle } from "ahooks";

import styles from "./index.module.scss";
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import PageStat from "./PageStat";
import ChartStat from "./ChartStat";

const Stat: FC = () => {
  const { loading } = useLoadeQuestionData();
  const { title, isPublished } = useGetPageInfo();
  const nav = useNavigate();

  // 状态提升 selectedId type
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponentType, setSelectedComponentType] = useState("");

  useTitle(`问卷统计-${title}`);

  const LoadingElem = (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin />
    </div>
  );

  function genContentElem() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <div style={{ flex: "1" }}>
          <Result
            status="warning"
            title="该问卷尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      );
    } else {
      return (
        <>
          <div className={styles.left}>
            <ComponentList
              selectedComponentId={selectedComponentId}
              setSelectedComponentId={setSelectedComponentId}
              setSelectedComponentType={setSelectedComponentType}
            />
          </div>
          <div className={styles.main}>
            <PageStat
              selectedComponentId={selectedComponentId}
              setSelectedComponentId={setSelectedComponentId}
              setSelectedComponentType={setSelectedComponentType}
            />
          </div>
          <div className={styles.right}>
            <ChartStat
              selectedComponentId={selectedComponentId}
              selectedComponentType={selectedComponentType}
            />
          </div>
        </>
      );
    }
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles["content-wrapper"]}>
        {loading && LoadingElem}
        {!loading && <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  );
};

export default Stat;
