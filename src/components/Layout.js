
import { Drawer, List, makeStyles } from '@material-ui/core'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material'
import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { format } from 'date-fns'
import Avatar from '@mui/material/Avatar';

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: "#f9f9f9",
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1,
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
}
)

const Layout = ({ children }) => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create'
        },

    ]
    return (
        <div className={classes.root}>

            <AppBar
                className={classes.appbar}
                sx={{
                    width: "calc(100% - 240px)"
                }}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>Mario</Typography>
                    <Avatar src="/avatar.png" className={classes.avatar} />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor='left'
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant='h5' className={classes.title}>
                        Ninja Note
                    </Typography>
                </div>

                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            button
                            onClick={() => history.push(item.path)}
                            className={location.pathname === item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}

export default Layout
