import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
// import { FaCheck } from "react-icons/fa";

const Action = ({
  mainAction,
  cancelAction,
  finishedAction,
  isActing,
  icon,
  description,
}) => {
  let resolvedClassName = '';
  if (isActing || description === 'delete') {
    resolvedClassName += ` action-${description}`;
  }
  return (
    <div className={'action' + resolvedClassName}>
      <span onClick={mainAction} className="mainAction">
        {icon}
      </span>
      {isActing && (
        <>
          <span onClick={cancelAction} className="cancelAction">
            <FontAwesomeIcon icon={faXmark} />
          </span>
          <span onClick={finishedAction} className="finishedAction">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </>
      )}
    </div>
  );
};

export default Action;
