import { Box, Typography, useTheme, TextField, MenuItem, Select, FormControl, InputLabel, Button } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import { tokens } from "../../theme";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddOrganization  from "./AddOrganization";
const ListOrganization = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);  // Track the current page size
  const [page, setPage] = useState(0);  // Track the current page number
  const [searchTerm, setSearchTerm] = useState("");  // Track the search term

  const columns = [
    { field: "id", headerName: "ID", filterable: true },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      filterable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      filterable: true,
    },
    { field: "phone", headerName: "Phone Number", flex: 1, filterable: true },
    { field: "email", headerName: "Email", flex: 1, filterable: true },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      filterable: true,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="120px"
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
            bgcolor={
              access === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius={1}
          >
            {access === "admin" && <AdminPanelSettingsOutlined />}
            {access === "manager" && <SecurityOutlined />}
            {access === "user" && <LockOpenOutlined />}
            <Typography textTransform="capitalize">{access}</Typography>
          </Box>
        );
      },
    },
  ];

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(0);  // Reset page to 0 when page size changes
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the rows based on search term
  const filteredRows = mockDataTeam.filter((row) => {
    return Object.values(row).some(
      (val) =>
        val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Total and filtered row counts
  const totalRows = mockDataTeam.length;
  const filteredRowsCount = filteredRows.length;

  return (
    <Box m="20px">
      <Header title="ORGANIZATION"  />
      
      {/* Search Box and New Button */}
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ maxWidth: "300px" }}  // Limit the width of the search box
        />

        {/* New Button */}
        

         <Button
                      variant="contained"
                      sx={{
                        bgcolor: colors.blueAccent[700],
                        color: "#fcfcfc",
                        // fontSize: isMdDevices ? "14px" : "10px",
                        fontWeight: "bold",
                        p: "10px 20px",
                        mt: "18px",
                        transition: ".3s ease",
                        ":hover": {
                          bgcolor: colors.blueAccent[800],
                        },
                      }}
                      onClick={() => {
                        // Handle the 'New' button action, e.g., open a modal or redirect
                        console.log("New Button Clicked");
                        navigate('add')
                      }}
                    
                    >
                          Add New
                    </Button>
      </Box>

      {/* Per Page Dropdown */}
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" >
        <Typography>Rows per page:</Typography>
        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel>Per Page</InputLabel>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            label="Rows per page"
          >
            {[10, 20, 50, 100].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        mt="40px"
        height="75vh"
        flex={1}
        sx={{
          "& .MuiDataGrid-root": {
            
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            
          },
          
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            color: colors.primary[500],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
            
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            color: colors.primary[500],
            backgroundColor: colors.blueAccent[700],
           
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
            
          },
          "& .MuiDataGrid-iconSeparator": {
            // color: colors.primary[100],
            color: colors.primary[500],
          },
          "& .MuiTablePagination-root": {
            // color: colors.primary[100],
            color: colors.primary[500],
          },
          "& .MuiButtonBase-root": {
            // color: colors.primary[100],
            color: colors.primary[500],
          },
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={pageSize}
          page={page}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pagination
        />
        
        {/* Custom Pagination Info */}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Typography>
            {searchTerm
              ? `Showing ${page * pageSize + 1} to ${Math.min(
                  (page + 1) * pageSize,
                  filteredRowsCount
                )} of ${filteredRowsCount} entries (filtered from ${totalRows} total entries)`
              : `Showing ${page * pageSize + 1} to ${Math.min(
                  (page + 1) * pageSize,
                  totalRows
                )} of ${totalRows} entries`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ListOrganization;

