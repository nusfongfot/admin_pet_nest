import { Typography } from "@mui/material";
import DataGridServices from "../service-ui/datagrid";
import React from "react";

type Props = {};

export default function CustomerComponent({}: Props) {
  const columns = [
    {
      field: "orderId",
      headerName: "Customer ID",
      width: 300,
      align: "center",
      headerAlign: "center",
      sortable: true,
    },

    {
      field: "orderDate",
      headerName: "Join Date",
      align: "center",
      headerAlign: "center",
      width: 300,
      sortable: true,
      renderCell: (params: any) => (
        <>
          <Typography>{params.value}</Typography>
        </>
      ),
    },
    {
      field: "name",
      headerName: "Customer Name",
      align: "center",
      headerAlign: "center",
      width: 250,
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
      width: 300,
      sortable: true,
      renderCell: (params: any) => (
        <>
          <Typography>{params.value}</Typography>
        </>
      ),
    },
    {
      field: "totalSpent",
      headerName: "Total Spent",
      align: "center",
      headerAlign: "center",
      width: 300,
      sortable: true,
      renderCell: (params: any) => (
        <>
          <Typography>{params.value}</Typography>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      orderId: "#123451AAECD",
      name: "Sophon Markmee",
      price: 40.0,
      qty: 5,
      orderDate: "18/01/2567 18:50PM",
      status: "Pending",
      location: "Mahasarakham",
      totalSpent: "$100",
    },
    {
      id: 2,
      orderId: "#123456",
      name: "Valhein Darkness",
      price: 300.0,
      qty: 10,
      orderDate: "18/01/2567 20:50PM",
      status: "Success",
      location: "Bangkok",
      totalSpent: "$300",
    },
  ];
  return (
    <div>
      <DataGridServices columns={columns} rows={rows} />
    </div>
  );
}
