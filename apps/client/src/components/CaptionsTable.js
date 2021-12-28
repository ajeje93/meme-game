const CaptionsTable = ({currentCaptions, onClickVote}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Caption ID</th>
          <th>Text</th>
          <th>Client ID</th>
          <th>Points</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {currentCaptions.map((caption) => (
          <tr key={caption.id}>
            <td>{caption.id}</td>
            <td>{caption.text}</td>
            <td>{caption.clientId}</td>
            <td>{caption.points}</td>
            <td>
              <button onClick={() => onClickVote(caption)}>Vote</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { CaptionsTable };
