import React, { FC, useEffect, useState } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

enum TAB_KEYS {
  PROP_KEY = "prop",
  SETTING_KEY = "setting",
}
const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);

  const { selectedId } = useGetComponentInfo();

  useEffect(() => {
    const activeKey = selectedId ? TAB_KEYS.PROP_KEY : TAB_KEYS.SETTING_KEY;
    setActiveKey(activeKey);
  }, [selectedId]);

  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];

  return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>;
};

export default RightPanel;
