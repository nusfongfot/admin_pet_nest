import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { MyLineChart } from "../line-chart";
import { MyBarChart } from "../bar-chart";
import PaidIcon from "@mui/icons-material/Paid";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from '@mui/icons-material/Person';

type Props = {};
export default function DashBoardComponent({}: Props) {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className='bg_pink' sx={{ p: 2 }}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                <Typography variant='h4' fontWeight={700}>
                  $ 87,561
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
                  10
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
                  5
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
          <MyLineChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <MyBarChart />
        </Grid>
      </Grid>
    </div>
  );
}
