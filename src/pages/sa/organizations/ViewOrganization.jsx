import { Box, Button, TextField, useMediaQuery,Typography, CircularProgress, useTheme, colors } from "@mui/material";
import { Header } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import { apis } from "../../../utils/utills";
import { tokens } from "../../../theme";
import CancelLink from "../../../components/btn/HyperLinkBtn";
import AddButton from "../../../components/btn/AddButton";

const ViewOrganization = () => {
  const theme = useTheme();
   const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming you're getting the organization ID from URL params
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const redirectUrl = `/sa/organizations/edit/${id}`;
  // Fetch organization data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${apis.baseUrl}/sa/getOrganizationDetailsById`,{
          "org_id":id
      }, {
          headers: {
            Authorization: sessionStorage.getItem("auth_token"),
          },
        });

        setInitialValues(response.data.org);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching organization:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="20px">
    <Header title="Organization Details" subtitle=" View the organization information here" />
    <div style={{ marginTop: "30px" }}>
    <Formik initialValues={initialValues} enableReinitialize>
      {({ values }) => (
        <form>
          {/* Fieldset Wrapper */}
          <fieldset style={fieldsetStyle}>
          
            <legend style={{ ...legendStyle }}>
            <Typography> Company Information</Typography>
             </legend>
  
            <Box display="grid" gap="20px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={gridStyle(isNonMobile)}>
              {renderTextField("Company Name", values.org_name, 2, )}
              {renderTextField("Website", values.website, 2,)}
              {renderTextField("PAN", values.PAN, 1, )}
              {renderTextField("GST No.", values.GST_No, 1, )}
              {renderTextField("State", values.state, 1,)}
              {renderTextField("City", values.city, 1, )}
            </Box>
          </fieldset>
  
          <fieldset style={fieldsetStyle}>
            <legend style={{ ...legendStyle,  }}>
              <Typography>Point Of Contact :: Administrator</Typography>
              </legend>
  
            <Box display="grid" gap="20px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" sx={gridStyle(isNonMobile)}>
              {renderTextField("Name", values.primary_contact_person, 1, )}
              {renderTextField("Phone", values.primary_contact_number, 1, )}
              {renderTextField("Email", values.primary_contact_email, 1, )}
              {renderTextField("Employee Code", values.employee_code, 1, )}
            </Box>
          </fieldset>
  
          <fieldset style={fieldsetStyle}>
            <legend style={{ ...legendStyle,  }}>
              <Typography>  Subscription</Typography>
            </legend>
  
            <Box display="grid" gap="20px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" sx={gridStyle(isNonMobile)}>
              {renderTextField("Start Date", values.access_start_date, 1, )}
              {renderTextField("End Date", values.access_end_date, 1, )}
            </Box>
          </fieldset>
  
          <Box display="flex" justifyContent="end"  gap={4}
                 alignItems="center">
           
            <CancelLink Hyperbtntext="Back" hyperLinkText="/sa/organizations"/>
           
            <AddButton btn=" Edit" Redirect={redirectUrl}/>
          </Box>
        </form>
      )}
    </Formik>
    </div>
  </Box>
  
  );
};
const renderTextField = (label, value, span) => (
  <Box sx={{ gridColumn: `span ${span}` }}>
    <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "5px", }}>
      {label}
    </Typography>
    <TextField value={value} variant="filled" fullWidth disabled sx={inputStyle} />
  </Box>
);
// Styles
const fieldsetStyle = {
  border: "2px solid #ddd",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
};

const legendStyle = {
  fontSize: "1.2rem",
  // fontWeight: "bold",
  // color: "#333",
  padding: "0 10px",
  marginBottom: "10px",
};

const gridStyle = (isNonMobile) => ({
  "& > div": {
    gridColumn: isNonMobile ? undefined : "span 4",
  },
});

const inputStyle = (span) => ({
  gridColumn: `span ${span}`,
 color:"red",
  borderRadius: "4px",
  "& .MuiFilledInput-root": {
    // backgroundColor: "#F2F0F0",
  },
});

export default ViewOrganization;
