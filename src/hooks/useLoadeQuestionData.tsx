import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../service/question";

function useLoadeQuestionData() {
  const { id = "" } = useParams();
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState({});

  useEffect(() => {
    async function fn() {
      const data = await getQuestion(id);
      setQuestionData(data);
      setLoading(false);
    }
    fn();
  }, []);

  return { loading, questionData };
}

export default useLoadeQuestionData;
