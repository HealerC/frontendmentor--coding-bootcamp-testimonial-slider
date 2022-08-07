import Action from "./Action";

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
          <Action
            isActing
            finishedAction={finishedEditing}
            cancelAction={cancelEditing}
            icon="E"
          />
        ) : (
          <Action mainAction={edit} icon="E" />
        )}
      </div>
      <div>
        {isAdding ? (
          <Action
            isActing
            finishedAction={finishedAdding}
            cancelAction={cancelAdding}
            icon="+"
          />
        ) : (
          <Action mainAction={add} icon="+" />
        )}
      </div>

      <span onClick={del}>D</span>
    </aside>
  );
};

export default ExtraActions;
