import React from "react";

const ExtraActions = ({ edit, add, del }) => {
  return (
    <aside className="card__extraActions">
      <span onClick={edit}>E</span>
      <span onClick={add}>A</span>
      <span onClick={del}>D</span>
    </aside>
  );
};

export default ExtraActions;
