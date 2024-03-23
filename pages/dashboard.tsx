import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { useRouter } from "next/router";
import DashBoardComponent from "@/components/dashboard";
import OrdersComponent from "@/components/orders";
import CustomersComponent from "@/components/customers";
import ProductsComponent from "@/components/products";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { deleteCookie } from "cookies-next";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    background: "linear-gradient(to right,#e83e8c,#eb418b,#f16ba8)",
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(2),
      },
    }),
  },
}));

const defaultTheme = createTheme();
const mainListItems = [
  {
    title: "Dashboard",
    link: "/dashboard?subpath=dashboard",
    subpath: "dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Orders",
    link: "/dashboard?subpath=orders",
    subpath: "orders",
    icon: <ShoppingCartIcon />,
  },
  {
    title: "Customers",
    link: "/dashboard?subpath=customers",
    subpath: "customers",
    icon: <PeopleIcon />,
  },
  {
    title: "Products",
    link: "/dashboard?subpath=products",
    subpath: "products",
    icon: <CategoryIcon />,
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogOut = () => {
    deleteCookie("tokenAdmin");
    window.location.replace("/");
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position='absolute' open={open} className='bg_pink'>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1, textTransform: "capitalize" }}
            >
              {router?.query?.subpath}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>
          <Divider sx={{ color: "white" }} />
          <List component='nav'>
            {mainListItems.map((item) => (
              <ListItemButton
                key={item.title}
                onClick={() => router.push(`${item.link}`)}
                sx={{
                  background:
                    router?.query?.subpath == item.subpath ? "#f94073" : "",
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
            {router.query.subpath == "dashboard" && <DashBoardComponent />}
            {router.query.subpath == "orders" && <OrdersComponent />}
            {router.query.subpath == "customers" && <CustomersComponent />}
            {router.query.subpath == "products" && <ProductsComponent />}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
