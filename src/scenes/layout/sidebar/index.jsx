/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton,  useTheme } from "@mui/material";
import { IoGlobeOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { ImTable } from "react-icons/im";
import { LuUserRound } from "react-icons/lu";


import { AiOutlineDashboard } from "react-icons/ai";
import {
  MenuOutlined,
} from "@mui/icons-material";
import avatar from "../../../assets/images/logo/XYZ_OPS_Logo.png";

import Item from "./Item";
import { ToggledContext } from "../../../App";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
               
                sx={{ transition: ".3s ease" }}
              >
                <img
                  style={{ width: "100px", height: "100px", marginTop:"50px", marginLeft:"30px", borderRadius: "8px", background:"white"  }}
                  src={avatar}
                  alt="Argon"
                />
               
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      

      <Box mb={5} mt={8} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Dashboard"
            path="/dashboard"
            colors={colors}
            icon={<AiOutlineDashboard style={{height:"25px",width:"25px"}}/>}
          />
            <Item
            title="Organizations"
            path="/organizations"
            colors={colors}
            icon={< IoGlobeOutline style={{height:"25px",width:"25px"}}/>}
          />
            <Item
            title="Departments"
            path="/department"
            colors={colors}
            icon={< ImTable style={{height:"20px",width:"20px"}}/>}
          />
            <Item
            title="Users"
            path="/"
            colors={colors}
            icon={<LuUserRound  style={{height:"25px",width:"25px"}} />}
          />
        </Menu>
        {/* <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Data" : " "}
        </Typography>{" "} */}
        {/* <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Manage Team"
            path="/team"
            colors={colors}
            icon={<PeopleAltOutlined />}
          />
          <Item
            title="Contacts Information"
            path="/contacts"
            colors={colors}
            icon={<ContactsOutlined />}
          />
          <Item
            title="Invoices Balances"
            path="/invoices"
            colors={colors}
            icon={<ReceiptOutlined />}
          />
        </Menu> */}
        {/* <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Pages" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Profile Form"
            path="/form"
            colors={colors}
            icon={<PersonOutlined />}
          />
          <Item
            title="Calendar"
            path="/calendar"
            colors={colors}
            icon={<CalendarTodayOutlined />}
          />
          <Item
            title="FAQ Page"
            path="/faq"
            colors={colors}
            icon={<HelpOutlineOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Charts" : " "}
        </Typography> */}
        {/* <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Bar Chart"
            path="/bar"
            colors={colors}
            icon={<BarChartOutlined />}
          />
          <Item
            title="Pie Chart"
            path="/pie"
            colors={colors}
            icon={<DonutLargeOutlined />}
          />
          <Item
            title="Line Chart"
            path="/line"
            colors={colors}
            icon={<TimelineOutlined />}
          />
          <Item
            title="Geography Chart"
            path="/geography"
            colors={colors}
            icon={<MapOutlined />}
          />
          <Item
            title="Stream Chart"
            path="/stream"
            colors={colors}
            icon={<WavesOutlined />}
          />
        </Menu> */}
      </Box>
    </Sidebar>
  );
};

export default SideBar;
