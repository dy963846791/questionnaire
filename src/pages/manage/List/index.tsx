import { FC, useEffect, useState, useRef, useMemo } from "react";
import { Typography, Spin, Empty } from "antd";
import { useDebounceFn, useRequest } from "ahooks";

import QuestionCard from "../../../components/QuestionCard";
import ListSearch from "../../../components/ListSearch";
import { useSearchParams } from "react-router-dom";

import { getQuestionListService } from "../../../service/question";

import styles from "../common.module.scss";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../../constant";

const { Title } = Typography;

const List: FC = () => {
  // 是否已经开始加载（防抖,有延迟时间）
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;

  // 获取url参数
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: resultList = [], total = 0 } = result;
        setList(list.concat(resultList));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );

  const containerRef = useRef<HTMLDivElement>(null);
  // 触发加载,借助ahooks中的useDebounceFn实现防抖
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) {
        return;
      }

      const domRect = elem.getBoundingClientRect();
      if (domRect == null) {
        return;
      }

      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load();
        setStarted(true);
      }
    },
    {
      wait: 500,
    }
  );

  useEffect(() => {
    tryLoadMore();
  }, [searchParams, tryLoadMore]);

  // 页面滚动时尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }

    return () => {
      window.removeEventListener("scroll", tryLoadMore);
    };
  }, [searchParams, haveMoreData, tryLoadMore]);

  const LoadMOreContentElem = useMemo(() => {
    if (!started || loading) {
      return <Spin />;
    }
    if (total === 0) {
      return <Empty description="暂无数据" />;
    }

    if (!haveMoreData) {
      return <span>没有更多了...</span>;
    }
    return <span>加载更多...</span>;
  }, [started, loading, total, haveMoreData]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((question: any) => {
            const { _id } = question;
            return <QuestionCard key={_id} {...question} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMOreContentElem}</div>
      </div>
    </>
  );
};

export default List;
