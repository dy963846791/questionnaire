import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cloneDeep from "lodash.clonedeep";
import { arrayMove } from "@dnd-kit/sortable";
import { ComponentPropsType } from "../../components/QuesionComponents";
import { getNextSelectedId, insertNewComponent } from "./utils";
import { nanoid } from "nanoid";
import { produce } from "immer";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
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
      insertNewComponent(state, newComponent);
    },
    // 修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload;

      const curCom = state.componentList.find((c) => c.fe_id === fe_id);
      if (curCom) {
        curCom.props = {
          ...curCom.props,
          ...newProps,
        };
      }
    },
    // 删除选中组件
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { componentList, selectedId: removeId } = state;

      // 重新计算selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList);
      state.selectedId = newSelectedId;

      const index = componentList.findIndex((c) => c.fe_id === removeId);
      componentList.splice(index, 1);
    },
    // 显示/隐藏组件
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList } = state;
      const { fe_id, isHidden } = action.payload;

      // 重新计算selectedId
      let newSelectedId = "";
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList);
      } else {
        newSelectedId = fe_id;
      }
      state.selectedId = newSelectedId;

      const curCom = componentList.find((c) => c.fe_id === fe_id);
      if (curCom) {
        curCom.isHidden = isHidden;
      }
    },

    // 锁定/解锁 组件
    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>
    ) => {
      const { componentList } = state;
      const { fe_id } = action.payload;
      const curCom = componentList.find((c) => c.fe_id === fe_id);
      if (curCom) {
        curCom.isLocked = !curCom.isLocked;
      }
    },

    // 拷贝当前选中的组件
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;
      const curCom = componentList.find((c) => c.fe_id === selectedId);

      if (curCom) {
        state.copiedComponent = cloneDeep(curCom);
      }
    },

    // 粘贴组件
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent } = state;
      if (copiedComponent == null) {
        return;
      }

      // 将fe_id修改
      copiedComponent.fe_id = nanoid();

      // 插入新组件
      insertNewComponent(state, copiedComponent);
    },

    // 选中上一个
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;

      const index = componentList.findIndex((c) => c.fe_id === selectedId);
      // 未选中组件
      if (index < 0) {
        return;
      }
      // 已经选中第一个，无法再向上选中
      if (index <= 0) {
        return;
      }

      state.selectedId = componentList[index - 1].fe_id;
    },

    // 选中下一个
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state;

      const index = componentList.findIndex((c) => c.fe_id === selectedId);
      // 未选中组件
      if (index < 0) {
        return;
      }
      // 已经选中第最后一个，无法再向下选中
      if (index === componentList.length - 1) {
        return;
      }

      state.selectedId = componentList[index + 1].fe_id;
    },

    // 修改组件标题
    chnageComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; title: string }>
    ) => {
      const { fe_id, title } = action.payload;
      const curCom = state.componentList.find((c) => c.fe_id === fe_id);
      if (curCom) {
        curCom.title = title;
      }
    },

    // 移动组件位置
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: curComponentList } = draft;
        const { oldIndex, newIndex } = action.payload;

        draft.componentList = arrayMove(curComponentList, oldIndex, newIndex);
      }
    ),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  chnageComponentTitle,
  moveComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;
