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
  openAddress: boolean;
  handleCloseAddress: () => void;
  dataAddress: any;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddressDialog({
  handleCloseAddress,
  openAddress,
  dataAddress,
}: Props) {
  React.useEffect(() => {}, [dataAddress]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseAddress}
        aria-labelledby='customized-dialog-title'
        open={openAddress}
        maxWidth='xl'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Address
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleCloseAddress}
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
          <Box sx={{ width: 700 }}>
            <Typography variant='h6'>
              {`Name: ${dataAddress?.user?.name} (${dataAddress?.address?.phone})`}
            </Typography>
            <Typography variant='h6'>
              {`Address: ${dataAddress?.address?.houseNo} ${dataAddress?.address?.road} ${dataAddress?.address?.tambon} ${dataAddress?.address?.amphoe} ${dataAddress?.address?.province} ${dataAddress?.address?.zipcode}`}
            </Typography>
            <Typography variant='h6'>
              {`Details: ${dataAddress?.address?.detail}` || ""}
            </Typography>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
