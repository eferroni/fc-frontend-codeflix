import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  Category,
  CategoryParams,
  Result,
  Results,
} from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

const category: Category = {
  id: "1",
  name: "Category 1",
  description: "Description 1",
  is_active: true,
  deleted_at: null,
  created_at: "2018-04-24T17:33:38.000",
  updated_at: "2018-04-24T17:33:38.000",
};

const endpointURL = "/categories";

// List categories
function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();
  if (params.page) {
    query.append("page", params.page.toString());
  }
  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }
  if (params.search) {
    query.append("search", params.search.toString());
  }
  if (params.isActive) {
    query.append("is_active", params.isActive.toString());
  }
  return query.toString();
}

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search, isActive: true };
  return `${endpointURL}?${parseQueryParams(params)}`;
}

// Get category
function getCategory({ id }: { id: string }) {
  return {
    url: `${endpointURL}/${id}`,
  };
}

// Create categories
function createCategoryMutation(category: Category) {
  return {
    url: endpointURL,
    method: "POST",
    body: category,
  };
}

// Update categories
function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointURL}/${category.id}`,
    method: "PUT",
    body: category,
  };
}

// Delete categories
function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointURL}/${category.id}`,
    method: "DELETE",
  };
}

// Category API Slice
export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategory: query<Result, { id: string }>({
      query: getCategory,
      providesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const initialState = [category];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    createCategory: (state, action) => {
      state.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state[index] = action.payload;
    },
    deleteCategory: (state, action) => {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state.splice(index, 1);
    },
  },
});

// Selectors
export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);
  return (
    category || {
      id: "",
      name: "",
      description: "",
      is_active: false,
      created_at: "",
      deleted_at: null,
      updated_at: "",
    }
  );
};

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;
export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categoriesApiSlice;
