import React from "react";
import { useLocation } from "react-router-dom";
import { ImageListItem } from "@mui/material";

const ShowImage = () => {
  const location = useLocation();
  const url = location.state.url;

  return (
    <>
      <ImageListItem>
        <img src={url} alt="" loading="lazy" />
        {/* <ImageListItemBar
          actionIcon={
            <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }}>
              <DownloadIcon />
            </IconButton>
          }
        /> */}
      </ImageListItem>
    </>
  );
};

export default ShowImage;