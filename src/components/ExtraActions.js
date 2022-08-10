import Action from './Action';
// import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

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
      {isAdding || isEditing ? (
        <>
          <Action
            isActing
            description={isAdding ? 'add' : 'edit'}
            icon={
              isAdding ? (
                <FontAwesomeIcon icon={faPlus} />
              ) : (
                <FontAwesomeIcon icon={faPen} />
              )
            }
          />
          <Action
            description="cancel"
            icon={<FontAwesomeIcon icon={faXmark} />}
            mainAction={isAdding ? cancelAdding : cancelEditing}
          />
          <Action
            description="finish"
            icon={<FontAwesomeIcon icon={faCheck} />}
            mainAction={isAdding ? finishedAdding : finishedEditing}
          />
        </>
      ) : (
        <>
          <Action
            description="edit"
            mainAction={edit}
            icon={<FontAwesomeIcon icon={faPen} />}
          />
          <Action
            description="add"
            mainAction={add}
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
          <Action
            description="delete"
            mainAction={del}
            icon={<FontAwesomeIcon icon={faTrash} />}
          />
        </>
      )}
    </aside>
  );
};

export default ExtraActions;
