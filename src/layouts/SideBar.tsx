import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// project import
import { sideBarData } from '../constants/sideBar';
import SideBarLink from '../components/SideBarLink';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function SideBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Logout handler - remove accessToken from localStorage
   */
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate(0);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
      <Box>
        <DashboardLogo pathname={location.pathname} />
        <Divider />
        <List sx={{ padding: 0 }}>
          {sideBarData.map((item) => (
            <SideBarLink link={item} key={item.id} pathname={location.pathname} />
          ))}
        </List>
      </Box>
      <Box display="flex" justifyContent="center" marginBottom="1rem">
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: theme.palette.secondary.dark
          }}
        >
          <LogoutIcon sx={{ fontSize: '1rem' }} />
          Logout
        </Button>
        <Divider />
      </Box>
    </Box>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 }
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              backgroundColor: theme.palette.primary.main,
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              backgroundColor: theme.palette.primary.main,
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

const DashboardLogo = ({ pathname }: { pathname: string }) => {
  let logo = 'logo';

  if (pathname === '/') {
    logo = 'Dashboard';
  } else {
    logo = pathname.split('/').pop() as string;
  }

  return (
    <Toolbar>
      <Typography
        variant="h5"
        sx={{ color: '#fff', textTransform: 'uppercase', textAlign: 'center' }}
      >
        {logo}
      </Typography>
    </Toolbar>
  );
};
