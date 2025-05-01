import { ComponentInfoType, ComponentsStateType } from ".";

/**
 * 获取下一个selectedId
 * @param fe_id 当前的id
 * @param componentList 组件列表
 * @returns 删除后选中的fe_id
 */
export function getNextSelectedId(
  fe_id: string,
  componentList: Array<ComponentInfoType>
) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) {
    return "";
  }

  // 重新计算 selectedId
  let newSelectedId = "";
  const length = visibleComponentList.length;
  if (length <= 1) {
    newSelectedId = "";
  } else {
    newSelectedId =
      index + 1 === length
        ? visibleComponentList[index - 1].fe_id
        : visibleComponentList[index + 1].fe_id;
  }

  return newSelectedId;
}

/**
 *  插入新组件
 * @param state state
 * @param newComponent 新组件
 */
export function insertNewComponent(
  state: ComponentsStateType,
  newComponent: ComponentInfoType
) {
  const { selectedId, componentList } = state;
  const index = componentList.findIndex((c) => c.fe_id === selectedId);

  if (index < 0) {
    // 未选中任何组件
    state.componentList.push(newComponent);
  } else {
    // 选中了组件 插入到index后面
    state.componentList.splice(index + 1, 0, newComponent);
  }

  state.selectedId = newComponent.fe_id;
}
