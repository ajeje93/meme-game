const NewRoomForm = ({ onClickNewRoom }) => {
  return (
    <form onSubmit={onClickNewRoom}>
      No room <button type="submit">Create new room</button>
    </form>
  );
};

export { NewRoomForm };
