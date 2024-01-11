import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, MenuItem, Stack, TextField } from "@mui/material";
import { errorToast, successToast } from "@/utils/notification";
import { uploadImages } from "@/api/upload";
import { createProduct, editProduct } from "@/api/product";
import { getCategory } from "@/api/category";
import LoadingButton from "@mui/lab/LoadingButton";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

type Props = {
  openProduct: boolean;
  handleCloseProduct: () => void;
  product: any;
  isEdit: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["clean"],
];

export default function CustomProductDialog({
  handleCloseProduct,
  openProduct,
  product,
  isEdit,
  setIsCreate,
}: Props) {
  const refInputFile = React.useRef<HTMLInputElement>(null);
  const [isLoding, setIsLoading] = React.useState<boolean>(false);

  const [isAdd, setAdd] = React.useState<boolean>(false);
  const [valueQill, setValueQill] = React.useState<string>("");
  const [categories, setCategories] = React.useState<any[]>([]);

  const [images, setImages] = React.useState<any[]>([]);
  const [oldImages, setOldImages] = React.useState<any[]>([]);
  const [values, setValues] = React.useState({
    title: "",
    price: "",
    qty: "",
    brand: "",
    cate: "",
  });

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: any = event.target.files;

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const fileSize = selectedFiles[i].size;
        const nameFile = selectedFiles[i].name;
        const maxSize = 2 * 1024 * 1024;
        if (fileSize > maxSize) {
          alert(`File ${nameFile} exceeds the maximum size limit of 2 MB.`);
          event.target.value = "";
          setImages([]);
          break;
        }
        if (selectedFiles.length > 4 || images.length > 3) {
          alert("Please select exactly 4 images.");
          event.target.value = "";
          setImages([]);
          break;
        }
        setImages([...images, ...selectedFiles]);
      }
      console.log("length", selectedFiles);
    }
  };

  const resetFileInput = () => {
    if (refInputFile.current) {
      refInputFile.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const deleteImage = images.filter((_, i) => i !== index);
    setImages(deleteImage);
  };

  const handleUploadImageAPI = async () => {
    try {
      const formData = new FormData();
      images.forEach((img, i) => {
        formData.append("images", img);
      });
      const res = await uploadImages(formData);
      const resultString = res.link.join(",");
      return resultString;
    } catch (error: any) {
      errorToast(error.message, 2000);
    }
  };

  const handleSaveChange = async () => {
    setIsLoading(true);
    try {
      const body = {
        title: values.title,
        price: values.price,
        qty: values.qty,
        category: values.cate,
        description: valueQill,
        brand: values.brand,
        images: await handleUploadImageAPI(),
      };
      const res = await createProduct(body);
      successToast(res.message, 1500);
      setIsCreate(true);
      handleCloseProduct();
    } catch (error: any) {
      return error;
    } finally {
      setIsLoading(false);
      resetFileInput();
      setImages([]);
    }
  };

  const handleEditSaveChange = async () => {
    setIsLoading(true);
    try {
      const body = {
        title: values.title,
        price: values.price,
        qty: values.qty,
        category: values.cate,
        description: valueQill,
        brand: values.brand,
      };
      const res = await editProduct(body, product.productId);
      successToast(res.message, 1500);
      setIsCreate(true);
      handleCloseProduct();
    } catch (error: any) {
      return error;
    } finally {
      setIsLoading(false);
      resetFileInput();
      setImages([]);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const res = await getCategory();
        const newData = res?.data?.map((item: any) => {
          return {
            value: item.title,
            label: item.title,
          };
        });
        setCategories(newData);
      } catch (error: any) {
        errorToast(error.message, 2000);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (images?.length == 0) {
      resetFileInput();
    }
  }, [images]);

  React.useEffect(() => {
    if (isEdit) {
      setValues({
        title: product?.title,
        qty: product?.qty,
        price: product?.price,
        cate: product?.category,
        brand: product?.brand,
      });
      setValueQill(product?.description);
      setOldImages(product?.images?.split(","));
    } else {
      setValues({
        title: "",
        qty: "",
        price: "",
        cate: "",
        brand: "",
      });
      setValueQill("");
    }
  }, [product, isEdit]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseProduct}
        aria-labelledby='customized-dialog-title'
        open={openProduct}
        maxWidth='xl'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          {isEdit ? "Edit Product" : "Create Product"}
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleCloseProduct}
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
          <Box sx={{ width: 800 }}>
            <Typography>title</Typography>
            <TextField
              size='small'
              fullWidth
              name='title'
              value={values.title || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeValues(e)
              }
            />

            <Typography>price</Typography>
            <TextField
              type='number'
              size='small'
              fullWidth
              name='price'
              value={values.price || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeValues(e)
              }
            />

            <Typography>Qty</Typography>
            <TextField
              type='number'
              size='small'
              fullWidth
              name='qty'
              value={values.qty || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeValues(e)
              }
            />

            <Typography>Brand</Typography>
            <TextField
              size='small'
              fullWidth
              name='brand'
              value={values.brand || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeValues(e)
              }
            />

            <Typography>Category</Typography>
            {isAdd ? (
              <TextField size='small' fullWidth />
            ) : (
              <TextField
                id='outlined-select-currency'
                select
                fullWidth
                size='small'
                name='cate'
                value={values.cate || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeValues(e)
                }
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}

            <Button size='small' onClick={() => setAdd(true)}>
              Add Category
            </Button>

            <Typography>Description</Typography>
            <ReactQuill
              theme='snow'
              value={valueQill || ""}
              onChange={setValueQill}
              modules={{ toolbar: toolbarOptions }}
              style={{ height: 150 }}
            />

            {isEdit ? (
              <Box mt={7}>
                <Typography>Old Images</Typography>
                {oldImages?.map((item) => (
                  <img
                    src={item}
                    style={{ width: 80, height: 80 }}
                    key={item}
                  />
                ))}
              </Box>
            ) : (
              <Box mt={5}>
                <Typography>
                  Images (Maximum 4 images / Maximum 2MB sizes)
                </Typography>
                <Box sx={{ border: "1px solid rgba(0,0,0,0.2)", p: 1 }}>
                  <input
                    type='file'
                    multiple
                    accept='image/jpeg, image/png'
                    onChange={handleFileChange}
                    ref={refInputFile}
                  />
                </Box>
                {images.length > 0 ? (
                  <Stack flexDirection={"row"} gap={1}>
                    {images.map((item, index) => (
                      <Stack
                        flexDirection={"row"}
                        key={index}
                        sx={{
                          position: "relative",
                        }}
                      >
                        <img
                          src={URL.createObjectURL(item)}
                          alt={`Selected Image ${index}`}
                          style={{
                            width: "120px",
                            height: "100px",
                            margin: "5px",
                          }}
                        />
                        <button
                          style={{
                            border: "none",
                            position: "absolute",
                            right: 0,
                            background: "red",
                            color: "white",
                            width: 20,
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemoveImage(index)}
                        >
                          x
                        </button>
                      </Stack>
                    ))}
                  </Stack>
                ) : null}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={isEdit ? handleEditSaveChange : handleSaveChange}
            loading={isLoding}
            loadingIndicator='Loading…'
            variant='contained'
          >
            Save changes
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
