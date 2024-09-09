import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import {
  CollectionsBookmark,
  Edit,
  Feedback,
  Help,
  PermMedia,
  UploadFile,
  Work,
} from '@mui/icons-material';

function DrawerApp() {
  const [mobileViewOpen, setMobileViewOpen] = React.useState(false);

  const handleToggle = () => {
    setMobileViewOpen(!mobileViewOpen);
  };

  const responsiveDrawer = (
    <div style={{ backgroundColor: '#09212E', height: '100%' }}>
      <Toolbar />
      <Divider />
      <Typography
        sx={{ textAlign: 'center', pt: 4, color: 'green', fontSize: 20 }}
      >
        GeeksforGeeks
      </Typography>
      <List sx={{ backgroundColor: '#09212E' }}>
        <ListItemButton sx={{ color: 'white' }}>
          <ListItemIcon sx={{ color: 'white' }}>{<Help />}</ListItemIcon>
          <ListItemText primary={'How to write'} />
        </ListItemButton>
        <ListItemButton sx={{ color: 'white' }}>
          <ListItemIcon sx={{ color: 'white' }}>
            {<CollectionsBookmark />}
          </ListItemIcon>
          <ListItemText primary={'Posts'} />
        </ListItemButton>
        <ListItemButton sx={{ color: 'white' }}>
          <ListItemIcon sx={{ color: 'white' }}>{<UploadFile />}</ListItemIcon>
          <ListItemText primary={'Pick Article'} />
        </ListItemButton>
       
      </List>
      <Divider />
     
    </div>
  );

  return (
    <div>
      <div>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              backgroundColor: 'green',
            }}
          >
            <Toolbar>
              <IconButton color="inherit" edge="start" onClick={handleToggle}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                Welcome to GeeksforGeeks Write Portal
              </Typography>
            </Toolbar>
          </AppBar>
          <Box component="nav">
            <Drawer
              variant="temporary"
              open={mobileViewOpen}
              onClose={handleToggle}
              anchor="right"
              ModalProps={{
                keepMounted: true,
              }}
            >
              {responsiveDrawer}
            </Drawer>
          </Box>
          <Box component="main">
            <Toolbar />
            <Typography paragraph>
              GeeksforGeeks provides Free Tutorials, Millions of Articles, Live,
              Online and Classroom Courses ,Frequent Coding Competitions,
              Webinars by Industry Experts, Internship opportunities and Job
              Opportunities. It provides all the individuals with a ‘Contribute’
              feature on their platform where they can come to write on a
              particular topic and share it with everyone and helps you to
              enhance your knowledge and expertise of particular subjects and
              allows you to showcase your research and writing skills to all
              others across the world. Not only this but you’ll also get
              rewarded for it in the form of remuneration, internship
              opportunities, discount offers, etc.
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default DrawerApp;
