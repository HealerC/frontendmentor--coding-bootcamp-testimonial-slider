import React from "react";

const ExtraActions = ({
  edit,
  add,
  del,
  isEditing,
  finishedEditing,
  cancelEditing,
}) => {
  return (
    <aside className="card__extraActions">
      <div>
        {isEditing ? (
          <div>
            <span onClick={finishedEditing}>V</span>
            <span onClick={cancelEditing}>X</span>
          </div>
        ) : (
          <span onClick={edit}>E</span>
        )}
      </div>
      <span onClick={add}>A</span>
      <span onClick={del}>D</span>
    </aside>
  );
};

export default ExtraActions;
