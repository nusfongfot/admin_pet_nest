import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

type Props = {
  openSlip: boolean;
  handleCloseSlip: () => void;
  dataSlip: any;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SlipDialog({
  handleCloseSlip,
  openSlip,
  dataSlip,
}: Props) {
  React.useEffect(() => {
    console.log("dataSlip", dataSlip);
  }, [dataSlip]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseSlip}
        aria-labelledby='customized-dialog-title'
        open={openSlip}
        maxWidth='xl'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Slip
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleCloseSlip}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ width: 500 }}>
            <img src={dataSlip.slip} style={{ width: 400, height: 400 }} />
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
