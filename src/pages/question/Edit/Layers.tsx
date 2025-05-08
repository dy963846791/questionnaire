import React, { FC, useState, ChangeEvent } from "react";
import classNames from "classnames";
import { message, Input, Button, Space } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  changeComponentHidden,
  changeSelectedId,
  chnageComponentTitle,
  moveComponent,
  toggleComponentLocked,
} from "../../../store/componentsReducer";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

import styles from "./Layers.module.scss";

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  // 记录当前正在修改标题的组件
  const [changeTitleId, setChangeTitleId] = useState("");

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find((c) => c.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.info("不能选中隐藏的组件");
      return;
    }
    if (fe_id !== selectedId) {
      // 当前组件未被选中，执行选中
      dispatch(changeSelectedId(fe_id));
      setChangeTitleId("");
      return;
    }

    // 点击修改标题
    setChangeTitleId(fe_id);
  }

  // 修改标题
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle || !selectedId) {
      return;
    }

    dispatch(chnageComponentTitle({ fe_id: selectedId, title: newTitle }));
  }

  // 切换隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }));
  }

  // 切换锁定/解锁
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }));
  }

  // SortableContainer 组件的 items 属性，需要每一个item 都有id
  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.fe_id };
  });

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    console.log(oldIndex, newIndex);
    dispatch(moveComponent({ oldIndex, newIndex }));
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;

        // 拼接 title className
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div
                className={titleClassName}
                onClick={() => handleTitleClick(fe_id)}
              >
                {fe_id === changeTitleId ? (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    onPressEnter={() => setChangeTitleId("")}
                    onBlur={() => setChangeTitleId("")}
                  />
                ) : (
                  title
                )}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={isHidden ? "" : styles.btn}
                    type={isHidden ? "primary" : "text"}
                    icon={<EyeInvisibleOutlined />}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  ></Button>
                  <Button
                    size="small"
                    shape="circle"
                    className={isLocked ? "" : styles.btn}
                    type={isLocked ? "primary" : "text"}
                    icon={<LockOutlined />}
                    onClick={() => changeLocked(fe_id)}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;
