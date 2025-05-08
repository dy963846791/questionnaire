import React, { FC, MouseEvent } from "react";
import { Spin } from "antd";
import classNames from "classnames";

import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
import { getComponentConfByType } from "../../../components/QuesionComponents";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

import styles from "./EditCanvas.module.scss";
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
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

  const dispatch = useDispatch();

  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation();

    dispatch(changeSelectedId(id));
  }

  useBindCanvasKeyPress();

  if (props.loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  }

  // SortableContainer 组件的 items 属性，需要每一个item 都有id
  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id };
  });

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((com) => !com.isHidden)
          .map((c) => {
            const { fe_id, isLocked } = c;

            const wrapperDefaultClassName = styles["component-wrapper"];
            const selectedClassName = styles.selected;
            const lockedClassName = styles.locked;
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            });

            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={(event) => handleClick(event, fe_id)}
                >
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
