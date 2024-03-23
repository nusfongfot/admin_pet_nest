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
  dataDetail: any[];
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
  React.useMemo(() => {}, [dataDetail]);

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
            <Typography variant='h6' fontWeight={700} align='right'>
              Total:{" "}
              {dataDetail.reduce((acc, val) => {
                const total = val.qty * val.product.price;
                return acc + total;
              }, 0)}{" "}
              $
            </Typography>
            {dataDetail.map((item) => (
              <Stack flexDirection={"row"} gap={3} key={item.orderId}>
                <img
                  src={JSON.parse(item.product.images).split(",")[0]}
                  style={{ width: 150, height: 150 }}
                />
                <Box>
                  <Typography>{item.product.title}</Typography>
                  <Typography>Price: {item.product.price}</Typography>
                  <Typography>Qty: {item.qty}</Typography>
                  <Typography variant='h6' fontWeight={500}>
                    subtotal: {numberWithComma(item.product.price * item.qty)}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
