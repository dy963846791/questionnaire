import React, { FC, MouseEvent } from "react";
import { Spin } from "antd";
import classNames from "classnames";

import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuesionComponents";

import styles from "./EditCanvas.module.scss";
import {
  ComponentInfoType,
  changeSelectedId,
} from "../../../store/componentsReducer";
import { useDispatch } from "react-redux";

export type EditCanvasProps = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;

  const componentConf = getComponentConfByType(type);
  if (componentConf == null) {
    return null;
  }

  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<EditCanvasProps> = (props: EditCanvasProps) => {
  const { componentList, selectedId } = useGetComponentInfo();
  console.log("test", componentList, selectedId);

  const dispatch = useDispatch();

  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation();

    dispatch(changeSelectedId(id));
  }

  if (props.loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      {componentList.map((c) => {
        const { fe_id } = c;

        const wrapperDefaultClassName = styles["component-wrapper"];
        const selectedClassName = styles.selected;
        const wrapperClassName = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });

        return (
          <div
            key={fe_id}
            className={wrapperClassName}
            onClick={(event) => handleClick(event, fe_id)}
          >
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;
