import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const CaptionsTable = ({ currentCaptions, onClickVote }) => {
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
                <Button onClick={() => onClickVote(caption)}>Vote</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { CaptionsTable };
