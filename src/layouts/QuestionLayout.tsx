import React,{FC} from 'react';
import {Outlet} from 'react-router-dom';

const QuestionLayout: FC = () => {
  return (
    <>
      <div>QuestionLayout header</div>
      <div>
        <Outlet />
      </div>
      <div>QuestionLayout footer</div>
    </>
  );
}

export default QuestionLayout;