import { Box, Button } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import CategoryTable from "./components/CategoryTable";

function ListCategory() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState([10, 25, 50, 100]);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const options = { perPage, search, page };

  const { data, isFetching, error } = useGetCategoriesQuery(options);

  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

  async function handleDelete(id: string) {
    await deleteCategory({ id });
  }

  function handleOnPageChange(page: number) {
    setPage(page + 1);
  }
  function handleFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      setSearch(filterModel.quickFilterValues.join(""));
    }
    return setSearch("");
  }
  function handleOnPageSizeChange(perPage: number) {
    setPerPage(perPage);
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted successfully", { variant: "success" });
    }
    if (deleteCategoryStatus.error) {
      enqueueSnackbar("Category not deleted", { variant: "error" });
    }
    if (error) {
      enqueueSnackbar("Error fetching categories", { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar, error]);

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>
      <CategoryTable
        data={data}
        perPage={perPage}
        isFetching={isFetching}
        rowPerPage={rowsPerPage}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleDelete={handleDelete}
      />
    </Box>
  );
}

export default ListCategory;
