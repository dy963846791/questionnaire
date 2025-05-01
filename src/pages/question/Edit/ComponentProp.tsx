import React, { FC } from "react";
import { useDispatch } from "react-redux";

import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentPropsType,
  getComponentConfByType,
} from "../../../components/QuesionComponents";
import { changeComponentProps } from "../../../store/componentsReducer";

const NoProp: FC = () => {
  return <div>未选中组件</div>;
};

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo();
  const dispatch = useDispatch();

  if (selectedComponent == null) {
    return <NoProp />;
  }

  const { type, props, isLocked, isHidden } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) {
    return <NoProp />;
  }

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) {
      return;
    }
    const { fe_id } = selectedComponent;
    console.log("newProps", newProps, fe_id);
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  const { PropComponent } = componentConf;
  return (
    <PropComponent
      disabled={isLocked || isHidden}
      {...props}
      onChange={changeProps}
    />
  );
};

export default ComponentProp;
