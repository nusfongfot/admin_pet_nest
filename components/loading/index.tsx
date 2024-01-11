import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoading } from "@/zustand/loading";

export default function SimpleBackdrop() {
  const { isLoading } = useLoading();

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 3 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}
