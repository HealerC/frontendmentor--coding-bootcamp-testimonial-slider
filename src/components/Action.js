/* Calls a function passed as a parameter to this component - `mainAction`
it renders an icon and only `edit` and `add` action can have an isActing
state in which the icon is styled appropriately, targeting `-active` (as below) */
const Action = ({ mainAction, isActing, icon, description }) => {
  let resolvedClassName = description; // edit, add, delete, cancel, finish
  if (isActing) resolvedClassName += ' ' + description + '-active';
  return (
    <div className={`action ${resolvedClassName}`}>
      <span onClick={mainAction}>{icon}</span>
    </div>
  );
};

export default Action;
