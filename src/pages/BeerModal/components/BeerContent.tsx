import {
  Accordion,
  AccordionSummary,
  Box,
  Divider,
  Typography,
  AccordionDetails,
  Skeleton,
} from "@mui/material";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import { BeerImage } from "./BeerImage";
import { FC, SyntheticEvent, useState } from "react";
import { IBeer } from "hooks/useTable";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Loader } from "components/Loader/Loader";

interface IBeerContent {
  beerInfo: IBeer | undefined;
  isLoading: boolean;
}

interface IAccordionBeerItems {
  title: string;
  item: keyof IBeer;
}

const ACCORDION_BEER_ITEMS: IAccordionBeerItems[] = [
  { title: "Tagline", item: "tagline" },
  { title: "ABV", item: "abv" },
  { title: "Description", item: "description" },
  { title: "Date first brewed", item: "first_brewed" },
  { title: "Brewer's tips", item: "brewers_tips" },
];

const getDefaultExpandedAccordions = () =>
  ACCORDION_BEER_ITEMS.map((item) => item.item);

export const BeerContent: FC<IBeerContent> = ({ beerInfo, isLoading }) => {
  const [expandedAccordions, setExpandedAccordions] = useState(
    getDefaultExpandedAccordions
  );

  const handleChangeAccordion =
    (accordionName: keyof IBeer) =>
    (_event: SyntheticEvent, isExpanded: boolean): void => {
      if (isExpanded) {
        setExpandedAccordions((prevExpanded) => [
          ...prevExpanded,
          accordionName,
        ]);
      } else {
        setExpandedAccordions((prevExpanded) =>
          prevExpanded.filter((item) => item !== accordionName)
        );
      }
    };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        paddingBottom={2}
      >
        {beerInfo ? (
          <BeerImage
            height={350}
            link={beerInfo.image_url}
            altText={beerInfo.name}
          />
        ) : (
          <Loader isLoading={isLoading} />
        )}
      </Box>

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h3">
        {beerInfo?.name ?? (
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        )}
      </Typography>

      <Divider sx={{ marginY: 2 }} />

      <Grid container spacing={2}>
        {ACCORDION_BEER_ITEMS.map((item) => (
          <Grid xs={12} lg={6} key={item.title}>
            <Accordion
              expanded={expandedAccordions.includes(item.item)}
              onChange={handleChangeAccordion(item.item)}
            >
              <AccordionSummary expandIcon={<SportsBarIcon />}>
                <Typography>{item.title}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>
                  {beerInfo?.[item.item] ?? (
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                  )}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
