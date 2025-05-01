import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionService } from "../service/question";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer";

function useLoadeQuestionData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) {
        throw new Error("没有问卷 id");
      }
      const data = await getQuestionService(id);

      return data;
    },
    {
      manual: true,
    }
  );

  // 根据获取的 data 设置 redux store
  useEffect(() => {
    if (!data) {
      return;
    }
    const { componentList = [] } = data;

    // 获取默认的 selectedId
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }

    // 把componentList 存储到 redux store
    dispatch(
      resetComponents({ componentList, selectedId, copiedComponent: null })
    );
  }, [data, dispatch]);

  // 判断id变化， 执行 ajax 加载问卷数据
  useEffect(() => {
    run(id);
  }, [id, run]);

  return { loading, error };
}

export default useLoadeQuestionData;
