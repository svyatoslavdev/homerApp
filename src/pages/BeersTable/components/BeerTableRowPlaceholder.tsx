import { Skeleton, TableCell, TableRow } from "@mui/material";

export const BeerTableRowPlaceholder = () => (
  <TableRow
    sx={{ "&:last-child td, &:last-child th": { border: 0 }, height: 120 }}
  >
    <TableCell component="th" scope="row">
      <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
    </TableCell>

    <TableCell>
      <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
    </TableCell>

    <TableCell>
      <Skeleton
        variant="rectangular"
        sx={{ borderRadius: 2 }}
        width={40}
        height={80}
      />
    </TableCell>

    <TableCell>
      <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
    </TableCell>
  </TableRow>
);
