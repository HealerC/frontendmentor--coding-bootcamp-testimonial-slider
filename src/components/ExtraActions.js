import React from "react";

const ExtraActions = ({
  edit,
  add,
  del,
  isEditing,
  finishedEditing,
  cancelEditing,
  isAdding,
  finishedAdding,
  cancelAdding,
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
      <div>
        {isAdding ? (
          <div>
            <span onClick={finishedAdding}>V</span>
            <span onClick={cancelAdding}>X</span>
          </div>
        ) : (
          <span onClick={add}>A</span>
        )}
      </div>

      <span onClick={del}>D</span>
    </aside>
  );
};

export default ExtraActions;
