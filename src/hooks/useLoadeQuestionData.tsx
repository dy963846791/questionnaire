import { useParams } from "react-router-dom";
import { getQuestion } from "../service/question";
import { useRequest } from "ahooks";

function useLoadeQuestionData() {
  const { id = "" } = useParams();
  // const [loading, setLoading] = useState(true);
  // const [questionData, setQuestionData] = useState({});

  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestion(id);
  //     setQuestionData(data);
  //     setLoading(false);
  //   }
  //   fn();
  // }, []);

  // return { loading, questionData };

  async function load() {
    const data = await getQuestion(id);
    return data;
  }

  const { data, error, loading } = useRequest(load);

  return { data, error, loading };
}

export default useLoadeQuestionData;
