import * as React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { MyLineChart } from "../line-chart";
import { MyBarChart } from "../bar-chart";
import PaidIcon from "@mui/icons-material/Paid";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import {
  getAllOrders,
  getRevenueCurrentWeek,
  getRevenueOfMonth,
  getRevenueTotal,
} from "@/api/order";
import { getAllUsers } from "@/api/user";

type Props = {};
export default function DashBoardComponent({}: Props) {
  const [lineGraph, setLineGraph] = React.useState<any[]>([]);
  const [barGraph, setBarGraph] = React.useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = React.useState<number>(0);
  const [totalUsers, setTotalUsers] = React.useState<number>(0);
  const [totalOders, setTotalOders] = React.useState<number>(0);

  React.useEffect(() => {
    (async () => {
      try {
        const revenueWeek = await getRevenueCurrentWeek();
        const revenueMonth = await getRevenueOfMonth();
        const revenueTotal = await getRevenueTotal();
        const users = await getAllUsers();
        const orders = await getAllOrders();
        
        setBarGraph(revenueMonth.data);
        setTotalUsers(users.data.length);
        setTotalOders(orders.data.length);
        setTotalRevenue(revenueTotal.data);
        setLineGraph(revenueWeek.data);
      } catch (error) {
        return error;
      }
    })();
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className='bg_pink' sx={{ p: 2 }}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                <Typography variant='h4' fontWeight={700}>
                  $ {totalRevenue || 0}
                </Typography>
                <Typography>Total Revenue</Typography>
              </Box>
              <PaidIcon sx={{ width: 60, height: 60 }} />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className='bg_pink' sx={{ p: 2 }}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                <Typography variant='h4' fontWeight={700}>
                  {totalOders || 0}
                </Typography>
                <Typography>Total Oders</Typography>
              </Box>
              <BookIcon sx={{ width: 60, height: 60 }} />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className='bg_pink' sx={{ p: 2 }}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                <Typography variant='h4' fontWeight={700}>
                  {totalUsers || 0}
                </Typography>
                <Typography>Total Customers</Typography>
              </Box>
              <PersonIcon sx={{ width: 60, height: 60 }} />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <MyLineChart lineGraph={lineGraph} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <MyBarChart barGraph={barGraph} />
        </Grid>
      </Grid>
    </div>
  );
}
