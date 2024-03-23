import * as React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import CustomProductDialog from "./create_dialog";
import SearchIcon from "@mui/icons-material/Search";
import { errorToast, successToast } from "@/utils/notification";
import {
  deleteProduct,
  getAllProduct,
  getDetailProduct,
  searchProduct,
} from "@/api/product";
import { useLoading } from "@/zustand/loading";
import Swal from "sweetalert2";

type Props = {};

export default function ProductsComponent({}: Props) {
  const { setLoading } = useLoading();

  const [openProduct, setOpenProduct] = React.useState<boolean>(false);
  const [isDelete, setIsDelete] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [isCreate, setIsCreate] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<any[]>([]);
  const [product, setProduct] = React.useState<object>({});
  const [search, setSearch] = React.useState<string>("");

  const handleClickOpenProduct = () => {
    setOpenProduct(true);
  };
  const handleCloseProduct = () => {
    setOpenProduct(false);
    setIsEdit(false);
  };

  const handleEditProduct = async (id: string) => {
    try {
      setIsEdit(true);
      setOpenProduct(true);
      const res = await getDetailProduct(id);
      setProduct(res.data);
    } catch (error) {
      return error;
    }
  };

  const handleSearchAPI = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await searchProduct(search);
      setProducts(res.data);
    } catch (error: any) {
      errorToast(error.message, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteProduct(id);
        setIsDelete(true);
        successToast(res.message, 1500);
      }
    });
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getAllProduct();
        setProducts(res.data);
      } catch (error: any) {
        errorToast(error.message, 2000);
      } finally {
        setLoading(false);
      }
    })();
  }, [isDelete, isCreate]);

  return (
    <div>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={3}
      >
        <Button
          className='bg_pink'
          size='small'
          onClick={handleClickOpenProduct}
        >
          create product
        </Button>
        <Paper
          component='form'
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
          onSubmit={(e) => handleSearchAPI(e)}
        >
          <IconButton
            type='button'
            sx={{ p: "10px" }}
            aria-label='search'
            onClick={(e: any) => handleSearchAPI(e)}
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder='Search...'
            inputProps={{ "aria-label": "search google maps" }}
            type='search'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </Paper>
      </Stack>
      <Grid container spacing={3}>
        {products.map((item, i) => (
          <Grid item xs={12} sm={6} lg={3} key={i}>
            <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
              <CardMedia
                component='img'
                alt='green iguana'
                height='350'
                image={item.images.split(",")[0]}
              />
              <CardContent>
                <Typography gutterBottom component='div'>
                  {item.title.substring(0, 40) + "..."}
                </Typography>
                <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
                  <Rating
                    value={
                      item?.reviews?.reduce((acc: any, val: any) => {
                        const total = acc + val.star;
                        return total;
                      }, 0) / item?.reviews?.length
                    }
                    readOnly
                    precision={0.5}
                  />
                  <Typography>{`(${item?.reviews?.length})`}</Typography>
                </Stack>
                <Typography
                  fontWeight={700}
                  variant='h5'
                  mt={1}
                  color='#f94073'
                >
                  {`$ ${item.price}`}
                </Typography>
                <Typography color={"rgba(0,0,0,.5)"}>
                  {`Salable ${item?.sold?.reduce(
                    (acc: any, val: any) => acc + val.qty,
                    0
                  )}`}
                </Typography>
                <Typography
                  color={"rgba(0,0,0,.5)"}
                >{`Qty ${item.qty}`}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant='contained'
                  color='error'
                  size='small'
                  onClick={() => handleDelete(item.productId)}
                >
                  Delete
                </Button>
                <Button
                  fullWidth
                  variant='contained'
                  className='bg_pink'
                  size='small'
                  onClick={() => handleEditProduct(item.productId)}
                >
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CustomProductDialog
        products={products}
        setProducts={setProducts}
        openProduct={openProduct}
        handleCloseProduct={handleCloseProduct}
        product={product}
        isEdit={isEdit}
        setIsCreate={setIsCreate}
      />
    </div>
  );
}
