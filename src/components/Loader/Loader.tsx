import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { FC } from 'react';
import { css } from '@emotion/react';

interface IImageLoad {
  heigth?: number;
}

const StyledLoaderImage = styled.img<IImageLoad>`
  border-radius: 50%;

  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}
`;

interface ILoader {
  isLoading: boolean;
  height?: number;
  alignItems?: string;
  justfyContent?: string;
}

export const Loader: FC<ILoader> = ({
  isLoading,
  height,
  alignItems = 'center',
  justfyContent = 'center',
}) =>
  isLoading ? (
    <Box display='flex' alignItems={alignItems} justifyContent={justfyContent}>
      <StyledLoaderImage
        height={height}
        src='https://media.tenor.com/8n3xudXxr-oAAAAC/homer-simpson-current-mood.gif'
      />
    </Box>
  ) : null;
