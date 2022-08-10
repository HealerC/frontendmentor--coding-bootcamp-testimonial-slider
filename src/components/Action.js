import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
// import { FaCheck } from "react-icons/fa";

const Action = ({ mainAction, isActing, icon, description }) => {
  let resolvedClassName = description;
  if (isActing) resolvedClassName += ' ' + description + '-active';
  return (
    <div className={`action ${resolvedClassName}`}>
      <span onClick={mainAction} className="mainAction">
        {icon}
      </span>
    </div>
  );
};

export default Action;
