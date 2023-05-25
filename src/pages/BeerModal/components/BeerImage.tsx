import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

import HomerImage from "assets/simpson.png";
import { useHover } from "hooks/useHover";
import { FC, useEffect, useState } from "react";
import { shakingAnimations } from "./animations";

interface IStyledBeerImage {
  isHovered: boolean;
  countSharking: number;
}

interface IBeerImage {
  link: string;
  height: string | number;
  altText?: string;
}

const StyledBeerImage = styled.img<IStyledBeerImage>`
  ${({ isHovered, countSharking }) =>
    isHovered &&
    css`
      animation: ${shakingAnimations[countSharking]} 0.5s linear;
    `}
`;

const MAX_COUNT_SHARKING = 4;

export const BeerImage: FC<IBeerImage> = ({
  link,
  height,
  altText = "beer",
}) => {
  const [countSharking, setCountSharking] = useState(0);
  const [imageRef, isHovered] = useHover();

  useEffect(() => {
    if (isHovered) {
      setCountSharking((prevCount) => prevCount + 1);
    }
  }, [isHovered]);

  return link && countSharking <= MAX_COUNT_SHARKING ? (
    <StyledBeerImage
      ref={imageRef}
      countSharking={countSharking}
      isHovered={isHovered}
      height={height}
      src={link}
      alt={altText}
    />
  ) : (
    <div style={{ position: "relative" }}>
      <img height={height} alt="sad homer" src={HomerImage} />

      {countSharking >= MAX_COUNT_SHARKING && (
        <Typography
          top={70}
          sx={{ transform: "rotate(305deg)", fontSize: 28, left: -60 }}
          position="absolute"
        >
          Oh no, you broke it.
        </Typography>
      )}
    </div>
  );
};
