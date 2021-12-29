const ClientsTable = ({ clients }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Client ID</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.name}</td>
            <td>{client.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { ClientsTable };
