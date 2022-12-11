import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "./categorySlice";
import CategoryForm from "./components/CategoryForm";
import { Category } from "../../types/Category";

function EditCategory() {
  const id = useParams().id || "";

  const { data: category, isFetching } = useGetCategoryQuery({ id });
  const [updateCategory, updateCategoryStatus] = useUpdateCategoryMutation();

  const { enqueueSnackbar } = useSnackbar();

  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    description: "",
    is_active: true,
    created_at: "",
    deleted_at: null,
    updated_at: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateCategory(categoryState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  useEffect(() => {
    if (category) {
      setCategoryState(category.data);
    }
  }, [category]);

  useEffect(() => {
    if (updateCategoryStatus.isSuccess) {
      enqueueSnackbar("Category updated successfully", { variant: "success" });
    }
    if (updateCategoryStatus.isError) {
      enqueueSnackbar("Category not updated", { variant: "error" });
    }
  }, [enqueueSnackbar, updateCategoryStatus]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          isDisabled={updateCategoryStatus.isLoading}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
}

export default EditCategory;
