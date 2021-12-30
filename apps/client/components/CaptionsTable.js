import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
                !currentClientVotes.find(
                  (v) =>
                    v.clientId === user.id && // don't show vote button if already voted
                    clients.length === currentCaptions.length // don't show vote button if not all clients have added captions
                ) ? (
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
