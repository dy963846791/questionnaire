import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";

import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from "../store/componentsReducer";

/**
 * 判断element是否合法
 * @returns
 */
function isActiveElementValid() {
  const activeElem = document.activeElement;

  // 没有增加 dnd-kit之前
  // if (activeElem === document.body) {
  //   return true;
  // }

  // 增加dnd-kit之后
  if (activeElem === document.body) {
    return true;
  }
  if (activeElem?.matches('div[role="button"]')) {
    return true;
  }

  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();

  // 删除组件
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(removeSelectedComponent());
  });

  // 复制组件
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(copySelectedComponent());
  });

  // 粘贴组件
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(pasteCopiedComponent());
  });

  // 选中上一个
  useKeyPress("uparrow", () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(selectPrevComponent());
  });

  // 选中下一个
  useKeyPress("downarrow", () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(selectNextComponent());
  });

  // 撤销
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      if (!isActiveElementValid()) {
        return;
      }
      dispatch(UndoActionCreators.undo());
    },
    {
      exactMatch: true, // 严格匹配
    }
  );

  // 重做
  useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(UndoActionCreators.redo());
  });
}

export default useBindCanvasKeyPress;
