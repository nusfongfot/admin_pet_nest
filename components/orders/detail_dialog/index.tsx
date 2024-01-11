import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import { numberWithComma } from "@/utils/numberWithComma";

type Props = {
  openDetail: boolean;
  handleCloseDetail: () => void;
  dataDetail: any;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DetailDialog({
  handleCloseDetail,
  openDetail,
  dataDetail,
}: Props) {
  const imageUrlStringWithoutQuotes = dataDetail?.images?.replace(
    /^"(.*)"$/,
    "$1"
  );
  const firstImage = imageUrlStringWithoutQuotes?.split(",")[0];
  React.useEffect(() => {}, [dataDetail]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseDetail}
        aria-labelledby='customized-dialog-title'
        open={openDetail}
        maxWidth='xl'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Detail
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleCloseDetail}
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
            <Stack flexDirection={"row"} gap={3}>
              <img src={firstImage} style={{ width: 150, height: 150 }} />
              <Box>
                <Typography>{dataDetail.title}</Typography>
                <Typography>Price: {dataDetail.price}</Typography>
                <Typography>Qty: {dataDetail.qty}</Typography>
                <Typography variant='h6' fontWeight={700}>
                  Total: {numberWithComma(dataDetail.price * dataDetail.qty)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
