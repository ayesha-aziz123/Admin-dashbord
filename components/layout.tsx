"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MenuIcon } from "lucide-react";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PeopleIcon from "@mui/icons-material/People";
import Order from "@mui/icons-material/BorderOuterRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Products from "@mui/icons-material/ProductionQuantityLimits";
import LogoutIcon from '@mui/icons-material/Logout';
import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';


const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  children?: React.ReactNode; // Add this line
}

export default function Layout(props: Props) {
  const { window } = props;
  const { children } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isCollapse, setIsCollapse] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false)
  const pathname = usePathname();
  const router = useRouter();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    }
  })


  if (session) {
    const user = session["user"];
    console.log('Session User ',user);
  }

  const userLogout = () => {
    signOut();
  }


  const drawer = (
    <div>
      <Toolbar className="text-xl bg-[#13132e] text-white font-semibold">
        <span className="text-textp">Hekto</span> Web
      </Toolbar>
      <Divider />
      <List>
        {["Dashboard", "Analytics","Orders", "Users","Products", "Profile"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            className={
              pathname.startsWith("/" + text.toLowerCase())
                ? "text-sky-600 bg-slate-100"
                : "text-slate-700"
            }
            onClick={() => router.push("/" + text.toLowerCase())}
          >
            <ListItemButton>
              <ListItemIcon
                className={
                  pathname.startsWith("/" + text.toLowerCase())
                    ? "text-sky-600 bg-slate-100"
                    : "text-slate-700"
                }
              >
                {index === 0 && <SpaceDashboardIcon />}
                {index === 1 && <QueryStatsIcon />}
                {index === 2 && <Order/>}
                {index === 3 && <PeopleIcon />}
                {index === 4 && <Products />}
                {index === 5 && <AccountCircleIcon />}

              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding onClick={handleCollapse}>
          <ListItemButton>
            <ListItemIcon
              className={
                pathname.startsWith("/help") ? "text-sky-600" : "text-slate-700"
              }
            >
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
            {!isCollapse ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Collapse in={isCollapse} timeout="auto" unmountOnExit>
        <List className="ml-5">
          {["Support", "Contact", "Docs"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => router.push("/" + text.toLowerCase())}
              >
                <ListItemIcon
                  className={
                    pathname.startsWith("/" + text.toLowerCase())
                      ? "text-sky-600 bg-slate-100"
                      : "text-slate-700"
                  }
                >
                  {index === 0 && <SupportAgentIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box   sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className="bg-[#13132e] text-white"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#FFFFFF",
          color: "#2f2f2f",
        }}
      >
        <div className="flex justify-between bg-[#13132e] text-white ">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography className="text-2xl font-bold" variant="h6" noWrap component="div">
              Dashboard 
            </Typography>
          </Toolbar>
          <div className="mt-3 mr-3 hover:text-red-500 transition-all ease-in hover:scale-105 cursor-pointer" onClick={() => userLogout()}>
            <Typography variant="h6" noWrap component="div">
              <LogoutIcon  className=""/> Logout
            </Typography>
          </div>
        </div>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <main className="">{children}</main>
      </Box>
    </Box>
  );
}
