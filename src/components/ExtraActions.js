import Action from "./Action";
// import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

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
      <Action
        isActing={isEditing}
        mainAction={edit}
        finishedAction={finishedEditing}
        cancelAction={cancelEditing}
        description="edit"
        icon={<FontAwesomeIcon icon={faPen} />}
      />
      <Action
        isActing={isAdding}
        mainAction={add}
        finishedAction={finishedAdding}
        cancelAction={cancelAdding}
        description="add"
        icon={<FontAwesomeIcon icon={faPlus} />}
      />
      <Action
        mainAction={del}
        description="delete"
        icon={<FontAwesomeIcon icon={faTrash} />}
      />
    </aside>
  );
};

export default ExtraActions;
