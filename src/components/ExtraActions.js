import Action from './Action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faPlus,
  faTrash,
  faXmark,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

/* All the extra actions that could be done by the app (edit, add, delete)
It uses the <Action /> component and gives them the functions to call on click
If the user `isAdding` or `isEditing` it renders two additional Action components to 
cancel or finish else it renders all the components for (edit, add, delete) */
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
      {/* If we are in isAdding/isEditing state, `isActing` is set to
      true to provide for styling */}
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
