import { BeerModal } from "pages/BeerModal/BeerModal";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const GET_PARAMS = {
  beerId: "beerId",
};

export const GET_ENUMS = {
  popup: {
    beer: "beer",
  },
};

const useGetPopupState = () => {
  const [searchParams] = useSearchParams();
  const popupName = searchParams.get(GET_PARAMS.beerId);

  const [mountedPopup, setMountedPopup] = useState(popupName);

  useEffect(() => {
    if (popupName) {
      setMountedPopup(popupName);
    } else {
      setMountedPopup(null);
    }
  }, [popupName]);

  return { mountedPopup, isOpened: !!mountedPopup, popupName };
};

export const GetParameterPopups = () => {
  const { isOpened, mountedPopup, popupName } = useGetPopupState();

  const Component = mountedPopup ? BeerModal : null;

  if (!Component) {
    return null;
  }

  return <Component isOpened={isOpened} id={popupName} />;
};
