import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useCreateCategoryMutation } from "../categories/categorySlice";
import CategoryForm from "./components/CategoryForm";
import { Category } from "../../types/Category";

function CreateCategory() {
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

  const [createCategory, createCategoryStatus] = useCreateCategoryMutation();

  const [isDisabled, setIsDisabled] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createCategory(categoryState);
  }

  useEffect(() => {
    if (createCategoryStatus.isSuccess) {
      enqueueSnackbar("Category created", { variant: "success" });
    }
    if (createCategoryStatus.isError) {
      enqueueSnackbar("Category not created", { variant: "error" });
    }
  }, [createCategoryStatus, enqueueSnackbar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          isDisabled={isDisabled}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
}

export default CreateCategory;
