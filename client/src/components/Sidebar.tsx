import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FlightIcon from "@mui/icons-material/Flight";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';


import '../styles/Sidebar.css'

const jinlogo = require('../assets/images/jin-logo.png')

const drawerWidth = 240;




export default function Sidebar() {



    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon /> },
        { text: "Timesheet", icon: <AccessTimeIcon /> },
        { text: "Leave", icon: <PersonOffIcon /> },
        { text: "Work From Home", icon: <HomeWorkIcon /> },
        { text: "Survey", icon: <AssignmentIcon /> },
        { text: "Service Desk", icon: <LiveHelpIcon /> },
        { text: "Forms", icon: <AssignmentTurnedInIcon /> },
        { text: "Travel", icon: <FlightIcon /> },
        { text: "Expenses", icon: <ReceiptIcon /> },
        { text: "Resourcing", icon: <PeopleIcon /> },
    ];

    const drawer = (
        <div className="Sidebar" style={{ background: "linear-gradient(#19105b, #472067, #7c3375, #FF6196)", height: "100%" }}>
            <div className="header">
                <img src={jinlogo} alt="" style={{ marginTop: 15, marginLeft: 15 }} />

            </div>
            <List style={{ color: "whitesmoke", fontSize: 100, height:"83%" }}>
                {menuItems.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon style={{ color: "whitesmoke", padding: 0, margin: 0 }}>{item.icon}</ListItemIcon>
                            <ListItemText style={{ padding: 0, margin: 0 }} primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <div className="footer" >
                <div className="profile">
                    <Avatar alt='abc' src='' sx={{cursor:"pointer"}} />
                    <span>Kaushal</span>
                </div>
                <IconButton aria-label='Logout'>
                    <LogoutIcon sx={{ color: "whitesmoke" }} />
                </IconButton>
            </div>
        </div>
    );


    return (
        <Box>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
            <MenuIcon
                onClick={handleDrawerToggle}
                sx={{
                    position:'absolute',
                    top:15,
                    left:5,
                    fontSize: 35,
                    fontWeight: "bold",
                    color: "whitesmoke",
                    display: { xs: 'block', sm: 'none' }
                }} />
        </Box>
    );
}