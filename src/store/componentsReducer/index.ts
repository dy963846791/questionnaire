import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuesionComponents";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => {
      return action.payload;
    },
    // 修改 selectedId
    changeSelectedId: (
      state: ComponentsStateType,
      action: PayloadAction<string>
    ) => {
      return { ...state, selectedId: action.payload };
    },
    // 添加新组件
    addComponent: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentInfoType>
    ) => {
      const newComponent = action.payload;

      const { selectedId, componentList } = state;
      const index = componentList.findIndex((c) => c.fe_id === selectedId);

      const newComponentList = [...componentList];
      if (index < 0) {
        // 未选中任何组件
        newComponentList.push(newComponent);
      } else {
        // 选中了组件，插入到index后面
        newComponentList.splice(index + 1, 0, newComponent);
      }
      return {
        ...state,
        selectedId: newComponent.fe_id,
        componentList: newComponentList,
      };
    },
  },
});

export const { resetComponents, changeSelectedId, addComponent } =
  componentsSlice.actions;

export default componentsSlice.reducer;
