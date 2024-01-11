import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import BreadCrumbsService from "../service-ui/breadcrumbs";
import DataGridServices from "../service-ui/datagrid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getAllOrders } from "@/api/order";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useLoading } from "@/zustand/loading";
import DetailDialog from "./detail_dialog";
import AddressDialog from "./address_dialog";
import SlipDialog from "./slip_dialog";

dayjs.extend(localizedFormat);

type Props = {};
const steps = [
  "Already ordered",
  "Waiting for transport to pick up",
  "In the process of being shipped",
  "Successful delivery",
];
export default function OrdersComponent({}: Props) {
  const { setLoading } = useLoading();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [rows, setRows] = React.useState<any[]>([]);
  const [dataDetail, setDataDetail] = React.useState<object>({});
  const [openDetail, setOpenDetail] = React.useState(false);
  const [dataAddress, setDataAddress] = React.useState<object>({});
  const [openAddress, setOpenAddress] = React.useState(false);
  const [dataSlip, setDataSlip] = React.useState<object>({});
  const [openSlip, setOpenSlip] = React.useState(false);

  const handleClickOpenDetail = (data: object) => {
    setOpenDetail(true);
    setDataDetail(data);
  };
  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleClickOpenAddress = (data: object) => {
    setOpenAddress(true);
    setDataAddress(data);
  };
  const handleCloseAddress = () => {
    setOpenAddress(false);
  };

  const handleClickOpenSlip = (data: object) => {
    setOpenSlip(true);
    setDataSlip(data);
  };
  const handleCloseSlip = () => {
    setOpenSlip(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const columns = [
    {
      field: "orderId",
      headerName: "Order Id",
      width: 200,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },

    {
      field: "createdAt",
      headerName: "Order Date",
      align: "center",
      headerAlign: "center",
      width: 280,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{dayjs(params.value).format("LLL")}</Typography>
        </>
      ),
    },
    {
      field: "name",
      headerName: "Customer Name",
      align: "center",
      headerAlign: "center",
      width: 250,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{params.row.user.name}</Typography>
        </>
      ),
    },

    {
      field: "detail",
      headerName: "Detail",
      align: "center",
      headerAlign: "center",
      width: 180,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <RemoveRedEyeIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleClickOpenDetail(params.row.product)}
          />
        </>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      align: "center",
      headerAlign: "center",
      width: 180,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <RemoveRedEyeIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleClickOpenAddress(params.row)}
          />
        </>
      ),
    },
    {
      field: "payment",
      headerName: "Payment",
      align: "center",
      headerAlign: "center",
      width: 180,
      sortable: false,
      renderCell: (params: any) => (
        <>
          {params.row.payment == "cod" ? (
            <Typography>Cod</Typography>
          ) : (
            <RemoveRedEyeIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleClickOpenSlip(params.row)}
            />
          )}
        </>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      width: 200,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Stack flexDirection={"row"} gap={2}>
            {params.row.status == "pending" ? (
              <Stack flexDirection={"row"} gap={2}>
                <CheckIcon className='btn_green' />
                <ClearIcon className='btn_red' />
              </Stack>
            ) : (
              <Box>
                <MoreHorizIcon
                  sx={{ cursor: "pointer" }}
                  onClick={(e: any) => handleClick(e)}
                />
                <Box>
                  <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Already ordered</MenuItem>
                    <MenuItem onClick={handleClose}>
                      Waiting for transport to pick up
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      In the process of being shipped
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      Successful delivery
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            )}
          </Stack>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getAllOrders();
        setRows(res.data);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <BreadCrumbsService />
      <Box mt={5}>
        <DataGridServices columns={columns} rows={rows} />
      </Box>
      <DetailDialog
        openDetail={openDetail}
        handleCloseDetail={handleCloseDetail}
        dataDetail={dataDetail}
      />
      <AddressDialog
        openAddress={openAddress}
        handleCloseAddress={handleCloseAddress}
        dataAddress={dataAddress}
      />
      <SlipDialog
        openSlip={openSlip}
        handleCloseSlip={handleCloseSlip}
        dataSlip={dataSlip}
      />
    </div>
  );
}
