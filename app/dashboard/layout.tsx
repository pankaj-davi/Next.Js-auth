'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';

import { middleware } from '../../middleware';
import { clearAuthCookies } from '@/utils/authUtils';
import { useRouter } from "next/navigation";
import { AppProvider } from '@/utils/store/context';


function DashboardLayout({ children }: any) {
  const navigation = useRouter()

  return (
    <React.Suspense fallback={'...Loading'}>
      <AppProvider>
        <AppBar position="static">
          <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }} >
            <Box sx={{ display: 'flex', alignItems: 'center' }} >
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/dashboard"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/dashboard"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{ display: 'flex', alignItems: 'center', columnGap: '15px' }}
            >
              <Typography sx={{ cursor: 'pointer' }} textAlign="center"
                onClick={() => {
                  clearAuthCookies();
                  navigation.push('/login');
                }}
              >{"Logout"}</Typography>
              <IconButton sx={{ p: 0 }} >
                <Avatar alt="Remy Sharp" src="https://randomuser.me/api/portraits/thumb/men/75.jpg" />
              </IconButton>
            </Box>
          </Container>
        </AppBar>
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </AppProvider>
    </React.Suspense>
  );
}
DashboardLayout.middleware = middleware;

export default DashboardLayout;


