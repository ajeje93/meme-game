const NewClientForm = ({ name, onClickNewClient, onClientNameChange }) => {
  return (
    <form onSubmit={onClickNewClient}>
      Name: <input type="text" value={name} onChange={onClientNameChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export { NewClientForm };
