import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
// import { FaCheck } from "react-icons/fa";

const Action = ({
  mainAction,
  cancelAction,
  finishedAction,
  isActing,
  icon,
}) => {
  if (isActing) {
    return (
      <div>
        <span onClick={finishedAction}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span onClick={cancelAction}>
          <FontAwesomeIcon icon={faXmark} />
        </span>
      </div>
    );
  }
  return <span onClick={mainAction}>{icon}</span>;
};

export default Action;
