import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";

const CaptionsTable = ({
  currentCaptions,
  currentClientVotes,
  clients,
  user,
  onClickVote,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Text</TableCell>
            <TableCell>Points</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentCaptions.map((caption) => (
            <TableRow key={caption.id}>
              <TableCell>{caption.text}</TableCell>
              <TableCell>{caption.points}</TableCell>
              <TableCell>
                {user &&
                user.id !== caption.clientId && // don't show vote button for own captions
                !currentClientVotes.find((v) => v.clientId === user.id) && // don't show vote button if already voted
                clients.length === currentCaptions.length ? ( // don't show vote button if not all clients have added captions
                  <Button onClick={() => onClickVote(caption)}>Vote</Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { CaptionsTable };
