import { IconButton, Typography, Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { Results } from "../../../types/Category";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowPerPage?: number[];
  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
};

function CategoryTable({
  data,
  perPage,
  isFetching,
  rowPerPage,
  handleFilterChange,
  handleOnPageChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  function renderActionCell(rowData: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        aria-label="delete"
        onClick={() => handleDelete(rowData.value)}
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: "is_active",
      headerName: "Active",
      flex: 1,
      type: "boolean",
      renderCell: renderIsActiveCell,
    },
    { field: "created_at", headerName: "Created At", flex: 1 },
    {
      field: "id",
      headerName: "Actions",
      flex: 1,
      type: "string",
      renderCell: renderActionCell,
    },
  ];

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      is_active: category.is_active,
      created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
    }));
  }

  const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];
  const rowCount = data?.meta.total || 0;

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        rows={rows}
        pagination={true}
        columns={columns}
        pageSize={perPage}
        filterMode={"server"}
        rowCount={rowCount}
        loading={isFetching}
        paginationMode={"server"}
        checkboxSelection={false}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        onPageChange={handleOnPageChange}
        rowsPerPageOptions={rowPerPage || [10, 25, 50, 100]}
        components={{ Toolbar: GridToolbar }}
        componentsProps={componentsProps}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
}

export default CategoryTable;
