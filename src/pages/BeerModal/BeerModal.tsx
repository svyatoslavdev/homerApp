import { Box, Modal } from "@mui/material";
import { useBeer } from "hooks/useBeer";
import qs from "qs";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { BeerContent } from "./components/BeerContent";

interface IBeerModal {
  isOpened: boolean;
  id: string | null;
}

export const BeerModal: FC<IBeerModal> = ({ isOpened, id }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: beer, isLoading } = useBeer(id ?? "1");
  const beerInfo = beer?.at(-1);

  const handleCloseModal = () => {
    const searchParamsObject = qs.parse(searchParams.toString());

    delete searchParamsObject["beerId"];

    setSearchParams(qs.stringify(searchParamsObject));
  };

  return (
    <Modal onClose={handleCloseModal} open={isOpened}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          minWidth: 400,
        }}
      >
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid
            xs={12}
            sx={{
              padding: 2,
              bgcolor: "background.paper",
              overflowY: "auto",
              maxHeight: "90vh",
            }}
          >
            <BeerContent isLoading={isLoading} beerInfo={beerInfo} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
