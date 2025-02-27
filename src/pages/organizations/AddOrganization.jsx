import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  org_name: "",
  access_start_date: "",
  access_end_date: "",
  primary_contact_person: "",
  primary_contact_email: "",
  primary_contact_number: "",
  website: "",
  PAN: "",
  GST_No: "",
  city: "",
  state: "",
};

const checkoutSchema = Yup.object({
  // Company Information
  org_name: Yup.string()
    .required("Company Name is required")
    .min(3, "Company Name must be at least 3 characters long"),

  PAN: Yup.string()
    .required("PAN is required")
    .min(10, "PAN must be 10 characters"),
  GST_No: Yup.string()
    .required("GST No. is required")
    .min(15, "GST No. must be at least 15 characters"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),

  // Point Of Contact Information
  primary_contact_person: Yup.string()
    .required("Contact Name is required")
    .min(3, "Contact Name must be at least 3 characters"),
  primary_contact_number: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  primary_contact_email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  // Subscription Information
  access_start_date: Yup.date()
    .required("Start date is required")
    .min(new Date(), "Start date must be in the future"),
  access_end_date: Yup.date()
    .required("End date is required")
    .min(Yup.ref("access_start_date"), "End date must be after start date"),
});

const AddOrganization = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm({
      values: initialValues,
    });
  };

  const navigate = useNavigate();

  //  const handleChange(()=>{

  //  })
  return (
    <Box m="20px">
      <Header
        title="CREATE ORGANIZATION"
        subtitle="Add new organization on the platform by filling the following details"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            {/* Fieldset Wrapper */}
            <fieldset
              style={{
                border: "2px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <legend
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#333",
                  padding: "0 10px",
                  marginBottom: "10px",
                }}
              >
                Company Information
              </legend>

              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Company Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.org_name}
                  name=" org_name"
                  error={touched.org_name && errors.org_name}
                  helperText={touched.org_name && errors.org_name}
                  sx={{
                    gridColumn: "span 2",
                    backgroundColor: "#F2F0F0", // Set background color to white
                    border: "1px solid #ddd", // Set border color
                    borderRadius: "4px", // Rounded corners for the input box
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Website"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="website"
                  error={touched.website && errors.website}
                  helperText={touched.website && errors.website}
                  sx={{
                    gridColumn: "span 2",
                    backgroundColor: "#F2F0F0",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="PAN"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.PAN}
                  name="PAN"
                  error={touched.PAN && errors.PAN}
                  helperText={touched.PAN && errors.PAN}
                  sx={{
                    gridColumn: "span 1",
                    backgroundColor: "#F2F0F0",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="GST No."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cGST_No}
                  name="GST_No"
                  error={touched.contact && errors.GST_No}
                  helperText={touched.contact && errors.GST_No}
                  sx={{
                    gridColumn: "span 1",
                    backgroundColor: "#F2F0F0",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="State"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.state}
                  name="state"
                  error={touched.state && errors.state}
                  helperText={touched.state && errors.state}
                  sx={{
                    gridColumn: "span 1",
                    backgroundColor: "#F2F0F0",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  name="city"
                  error={touched.city && errors.city}
                  helperText={touched.city && errors.city}
                  sx={{
                    gridColumn: "span 1",
                    backgroundColor: "#F2F0F0",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
              </Box>
            </fieldset>

            <fieldset
              style={{
                border: "2px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <legend
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#333",
                  padding: "0 10px",
                  marginBottom: "10px",
                }}
              >
                Point Of Contact :: Administrator
              </legend>

              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 3",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label=" Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.primary_contact_person}
                  name="primary_contact_person"
                  error={
                    touched.primary_contact_person &&
                    errors.primary_contact_person
                  }
                  helperText={
                    touched.primary_contact_person &&
                    errors.primary_contact_person
                  }
                  sx={{
                    gridColumn: "span 1",
                    backgroundColor: "#F2F0F0", // Set background color to white
                    border: "1px solid #ddd", // Set border color
                    borderRadius: "4px", // Rounded corners for the input box
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.primary_contact_number}
                  name="primary_contact_number"
                  error={
                    touched.primary_contact_number &&
                    errors.primary_contact_number
                  }
                  helperText={
                    touched.primary_contact_number &&
                    errors.primary_contact_number
                  }
                  sx={{
                    gridColumn: "span 1",
                    backgroundColor: "#F2F0F0",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.primary_contact_email}
                  name="primary_contact_email"
                  error={
                    touched.primary_contact_email &&
                    errors.primary_contact_email
                  }
                  helperText={
                    touched.primary_contact_email &&
                    errors.primary_contact_email
                  }
                  sx={{
                    gridColumn: "span 1",
                    backgroundColor: "#F2F0F0",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
              </Box>
            </fieldset>

            <fieldset
              style={{
                border: "2px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <legend
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#333",
                  padding: "0 10px",
                  marginBottom: "10px",
                }}
              >
                Subscription
              </legend>

              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 2",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Start Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.access_start_date}
                  name="access_start_date"
                  error={touched.access_start_date && errors.access_start_date}
                  helperText={
                    touched.access_start_date && errors.access_start_date
                  }
                  sx={{
                    gridColumn: "span 1",
                    backgroundColor: "#F2F0F0", // Set background color to white
                    border: "1px solid #ddd", // Set border color
                    borderRadius: "4px", // Rounded corners for the input box
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="End Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.access_end_date}
                  name="lastName"
                  error={touched.access_end_date && errors.access_end_date}
                  helperText={touched.access_end_date && errors.access_end_date}
                  sx={{
                    gridColumn: "span 1",
                    backgroundColor: "#F2F0F0",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F2F0F0", // Ensure the background color is white
                    },
                  }}
                />
              </Box>
            </fieldset>

            <div className="flex gap-4 justify-end">
              {/* cancel Button */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="end"
                mt="20px"
              >
                <Button
                  onClick={() => {
                    // Handle the 'New' button action, e.g., open a modal or redirect

                    navigate("/organizations");
                  }}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Box>

              {/* Submit Button */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="end"
                mt="20px"
              >
                <Button type="submit" color="secondary" variant="contained">
                  Submit
                </Button>
              </Box>
            </div>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddOrganization;
