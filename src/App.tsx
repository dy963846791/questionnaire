import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import 'antd/dist/antd.min.css';

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
