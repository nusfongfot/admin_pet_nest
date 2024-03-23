import { Typography } from "@mui/material";
import DataGridServices from "../service-ui/datagrid";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/api/user";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

type Props = {};

export default function CustomerComponent({}: Props) {
  const [rows, setRows] = useState<any[]>([]);
  const columns = [
    {
      field: "userId",
      headerName: "Customer ID",
      // width: 310,
      flex:1,
      align: "center",
      headerAlign: "center",
      sortable: true,
    },

    {
      field: "createdAt",
      headerName: "Join Date",
      align: "center",
      headerAlign: "center",
      // width: 310,
      flex:1,
      sortable: true,
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
      // width: 310,
      flex:1,
      sortable: true,
      renderCell: (params: any) => (
        <>
          <Typography>{params.value}</Typography>
        </>
      ),
    },

    {
      field: "location",
      headerName: "Location",
      align: "center",
      headerAlign: "center",
      // width: 310,
      flex:1,
      sortable: true,
      renderCell: (params: any) => (
        <>
          <Typography>{params?.row?.address[0]?.province}</Typography>
        </>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllUsers();
        setRows(res.data);
      } catch (error) {
        return error;
      }
    })();
  }, []);

  return (
    <div>
      <DataGridServices columns={columns} rows={rows} />
    </div>
  );
}
