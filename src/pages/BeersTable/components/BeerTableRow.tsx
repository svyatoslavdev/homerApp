import styled from '@emotion/styled';
import { Box, TableCell, TableRow } from '@mui/material';
import { useHover } from 'hooks/useHover';
import { IBeer } from 'hooks/useTable';
import { FC, useEffect, useState } from 'react';
import HomerImage from 'assets/simpson.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';

const StyledImage = styled.img<{ isHovered: boolean; isAnimate: boolean }>`
  z-index: 101;
  position: absolute;
  top: 16px;
  display: ${({ isHovered, isAnimate }) =>
    isHovered || isAnimate ? 'block' : 'none'};
  height: ${({ isAnimate, isHovered }) =>
    isAnimate && isHovered ? '200px' : '80px'};

  transition: height 0.5s ease;
`;

export const BeerTableRow: FC<{ beer: IBeer }> = ({ beer }) => {
  const [imageRef, isHovered] = useHover();
  const [isAnimate, setIsAnimate] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [searchState] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsAnimate(isHovered), 500);
  }, [isHovered]);

  const handleOpenModal = () => {
    navigate(
      { search: `${searchState.toString()}&beerId=${beer.id}` },
      { replace: true },
    );
  };

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        height: 120,
        cursor: 'pointer',
      }}
      onClick={handleOpenModal}
    >
      <TableCell component='th' scope='row'>
        {beer.name}
      </TableCell>

      <TableCell>{beer.tagline}</TableCell>

      <TableCell
        ref={imageRef}
        sx={{ position: 'relative' }}
        id={String(beer.id)}
      >
        {beer.image_url ? (
          <>
            <StyledImage
              isHovered={isHovered}
              isAnimate={isAnimate}
              alt={beer.name}
              src={beer.image_url}
            />

            {(!isHovered || !isAnimate) && (
              <img
                height={80}
                style={{ display: isImageLoading ? 'none' : 'block' }}
                onLoad={() => setIsImageLoading(false)}
                alt={beer.name}
                src={beer.image_url}
              />
            )}

            <Loader
              justfyContent='flex-start'
              height={80}
              isLoading={isImageLoading}
            />
          </>
        ) : (
          <Box display='flex' alignItems='center'>
            <img height={80} alt='sad homer' src={HomerImage} /> No beer preview
          </Box>
        )}
      </TableCell>

      <TableCell>{beer.abv}%</TableCell>
    </TableRow>
  );
};
