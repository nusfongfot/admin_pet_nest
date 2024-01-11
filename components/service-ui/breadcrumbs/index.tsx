import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Props = {
  title: string;
};

export default function BreadCrumbsService() {
  const breadcrumbs = [
    <Link underline='hover' key='1' color='inherit' href='/#'>
      All
    </Link>,
    <Link underline='hover' key='2' color='inherit' href='/#'>
      Confirm
    </Link>,
    <Link underline='hover' key='3' color='inherit' href='/#'>
      Cancel
    </Link>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
