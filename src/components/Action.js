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
        <span onClick={finishedAction}>V</span>
        <span onClick={cancelAction}>X</span>
      </div>
    );
  }
  return <span onClick={mainAction}>{icon}</span>;
};

export default Action;
