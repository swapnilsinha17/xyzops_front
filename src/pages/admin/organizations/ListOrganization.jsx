  import {
    Box,
    Typography,
    useTheme,
    TextField,
    MenuItem,
    Select,
    FormControl,
    Switch,
    InputLabel,
    Button,
  } from "@mui/material";
  import { Header } from "../../../components";
  import { DataGrid } from "@mui/x-data-grid";
  import { toast , ToastContainer} from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  // toast.configure();
  //  import AccesssToken from "../../utils/utills";
  import { tokens } from "../../../theme";
  import {
    AdminPanelSettingsOutlined,
    LockOpenOutlined,
    SecurityOutlined,
  } from "@mui/icons-material";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import AddOrganization from "./AddOrganization";
  import axios from "axios";
  import { apis } from "../../../utils/utills";
  const ListOrganization = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(10); // Track the current page size
    const [page, setPage] = useState(0); // Track the current page number
    const [searchTerm, setSearchTerm] = useState(""); // Track the search term
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleStatusToggle = async (id, currentStatus) => {
      try {
        const newStatus = currentStatus === 1 ? "Inactive" : "Active";

        // Optimistically update the UI before the API call
        setOrganizations((prevOrgs) =>
          prevOrgs.map((org) =>
            org.org_id === id ? { ...org, status: currentStatus === 1 ? 0 : 1 } : org
          )
        );
    
        // Send the update request to the server
        const response = await axios.post(
          `${apis.baseUrl}/sa/updateOrganizationStatus`,
          { org_id: id, status: currentStatus == 1 ? 0 : 1 },
          {
            headers: {
              Authorization: sessionStorage.getItem("auth_token"),
            },
          }
        );
        toast.success(`Status updated to ${newStatus}`, {
          position: "top-right",
          autoClose: 3000, // Closes after 3 seconds
        });
        console.log("Status updated successfully:", response.data);
        fetchOrganizations()
      } catch (error) {
        console.error("Error updating status:", error);
        // Revert the UI change if the API call fails
        setOrganizations((prevOrgs) =>
          prevOrgs.map((org) =>
            org.org_id === id ? { ...org, status: currentStatus } : org
          )
        );
      }
    };
    const columns = [
      {
        field: "id",
        headerName: "SN",
        filterable: true,
        // renderCell: (params) => (
        //   <Box
        //     sx={{
        //       backgroundColor: "red", // Blue color for badge
        //       color: "#fff",
        //       padding: "5px 5px",
        //       borderRadius: "12px",
        //       textAlign: "center",
        //       minWidth: "40px",
        //       fontWeight: "bold",
        //       display: "inline-block",
        //     }}
        //   >
        //     {params.value}
        //   </Box>
        // ),
      },{
        field: "org_name",
        headerName: "Company",
        flex: 1,
        cellClassName: "company-column--cell",
        filterable: true,
        renderCell: (params) => (
          <Typography
            sx={{
              color: "#007bff",
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": { color: "#0056b3" },
            }}
            onClick={() => navigate(`/sa/organizations/view/${params.row.org_id}`)}
          >
            {params.value}
          </Typography>
        ),
      },
      {
        field: "org_id",
        headerName: "Code",
        flex: 1,
        headerAlign: "left",
        align: "left",
        type: "number",
        filterable: true,
      },
      {
        field: "access_end_date",
        headerName: "Access Ends On",
        // type: "date",
        headerAlign: "left",
        align: "left",
        filterable: true,
        flex: 1,
      },
      {
        field: "is_active",
        headerName: "Status",
        flex: 1,
        filterable: true,
        renderCell: (params) => (
          <Switch
            checked={params.value == 1}
            onChange={() => handleStatusToggle(params.row.org_id, params.value)}
            color="primary"
          />
        ),
      },
      { field: "city", headerName: "City", flex: 1, filterable: true },
      {
        field: "state",
        headerName: "State",
        flex: 1,
        filterable: true,
      },
      // {
      //   field: "action",
      //   headerName: "Action",
      //   flex: 1,
      //   filterable: true,
      // },
    ];

    // Handle page change
    const handlePageChange = (newPage) => {
      setPage(newPage);
    };

    // Handle page size change
    const handlePageSizeChange = (event) => {
      setPageSize(event.target.value);
      setPage(0); // Reset page to 0 when page size changes
    };

    // Handle search term change
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    // Filter the rows based on search term
    const filteredRows = organizations.filter((row) => {
      return Object.values(row).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Total and filtered row counts
    const totalRows = organizations.length;
    const filteredRowsCount = filteredRows.length;
    useEffect(() => {
      console.log("Updated Organizations:", organizations);
    }, [organizations]); 
    const fetchOrganizations = async () => {
      console.log("Xz")
      try {
        const response = await axios.get(
          `${apis.baseUrl}/sa/getOrganizationlist`,
          {
            headers: {
              Authorization: sessionStorage.getItem("auth_token"), // `${AccesssToken}`,  // Basic authentication header
            },
          }
        );
      console.log(response.data.org.organizations,"res")
        const orgData = response?.data?.org?.organizations;
      
        if (orgData && orgData.length > 0) {
          console.log(organizations)
          const updatedData = orgData.map((org, index) => ({
            ...org,
            id: index +1, // Assuming 'org_id' is unique
          }));
          
          setOrganizations(updatedData);
          // setOrganizations(orgData);
          console.log(organizations)
          console.log("response data of organizationssss", organizations);
        } else {
          console.error("No organizations found in response");
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch organizations");
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchOrganizations();
    }, []);
    return (


      <Box m="20px">
         <ToastContainer position="top-right" autoClose={3000} />
   
        <Header title="ORGANIZATION" />

        {/* Search Box and New Button */}
        
        <Box
          mb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
         
        >
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ maxWidth: "300px" }} // Limit the width of the search box
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
              navigate("add");
            }}
          >
            Add New
          </Button>
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
              // backgroundColor: '#fafafa',
              
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
              color: '#000',
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
