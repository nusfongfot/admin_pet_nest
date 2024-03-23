import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import BreadCrumbsService from "../service-ui/breadcrumbs";
import DataGridServices from "../service-ui/datagrid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getAllOrders, updateStatusOrder } from "@/api/order";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useLoading } from "@/zustand/loading";
import DetailDialog from "./detail_dialog";
import AddressDialog from "./address_dialog";
import SlipDialog from "./slip_dialog";
import Swal from "sweetalert2";
import { successToast } from "@/utils/notification";

dayjs.extend(localizedFormat);

type Props = {};
const statusOrders = [
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
  const [dataDetail, setDataDetail] = React.useState<any[]>([]);
  const [openDetail, setOpenDetail] = React.useState<boolean>(false);
  const [dataAddress, setDataAddress] = React.useState<object>({});
  const [openAddress, setOpenAddress] = React.useState<boolean>(false);
  const [dataSlip, setDataSlip] = React.useState<object>({});
  const [openSlip, setOpenSlip] = React.useState<boolean>(false);
  const [idEdit, setIdEdit] = React.useState<string>("");
  const [textUpdate, settextUpdate] = React.useState<string>("");

  const handleClickOpenDetail = (data: any) => {
    setOpenDetail(true);
    setDataDetail(JSON.parse(data));
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

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setIdEdit(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (e: any) => {
    try {
      const value = e.target.innerText;
      if (value && idEdit) {
        const body = {
          status: value,
        };
        const res = await updateStatusOrder(idEdit, body);
        successToast(res.message, 1500);
        settextUpdate(value);
      }
    } catch (error) {
      return error;
    } finally {
      setAnchorEl(null);
    }
  };
  const handleConfirmOrder = (id: string) => {
    console.log("id", id);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const body = {
            status: "Already ordered",
          };
          const res = await updateStatusOrder(id, body);
          successToast(res.message, 1500);
          settextUpdate(id);
        } catch (error) {
          return error;
        }
      }
    });
  };

  const handleCancleOrder = (id: string) => {
    console.log("id", id);
    Swal.fire({
      title: "Are you sure to cancel?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const body = {
            status: "Cancel",
          };
          await updateStatusOrder(id, body);
          successToast("cancel successfully", 1500);
          settextUpdate(id);
        } catch (error) {
          return error;
        }
      }
    });
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
      headerName: "Details",
      align: "center",
      headerAlign: "center",
      width: 160,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <RemoveRedEyeIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleClickOpenDetail(params.row.details)}
          />
        </>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      align: "center",
      headerAlign: "center",
      width: 160,
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
      width: 160,
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
      width: 270,
      sortable: false,
      renderCell: (params: any) => (
        <Stack flexDirection={"column"} alignItems={"center"}>
          {params.row.status !== "pending" && (
            <Typography color={params.row.status == "Cancel" ? "red" : ""}>
              {params.row.status}
            </Typography>
          )}

          <Stack flexDirection={"row"} gap={2}>
            {params.row.status == "pending" && (
              <Stack flexDirection={"row"} gap={2}>
                <CheckIcon
                  className='btn_green'
                  onClick={() => handleConfirmOrder(params.row.orderId)}
                />
                <ClearIcon
                  className='btn_red'
                  onClick={() => handleCancleOrder(params.row.orderId)}
                />
              </Stack>
            )}

            {params.row.status !== "pending" &&
              params.row.status != "Cancel" && (
                <>
                  <Box>
                    <MoreHorizIcon
                      sx={{ cursor: "pointer" }}
                      onClick={(e: any) => handleClick(e, params.row.orderId)}
                    />
                    <Box>
                      <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        onClick={(e: any) => handleClose(e)}
                      >
                        {statusOrders.map((option) => (
                          <MenuItem key={option}>{option}</MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  </Box>
                </>
              )}
          </Stack>
        </Stack>
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
  }, [textUpdate]);

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
