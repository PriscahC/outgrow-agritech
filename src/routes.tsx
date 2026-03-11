import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import FarmMapPage from './pages/FarmMapPage';
import CropMonitorPage from './pages/CropMonitorPage';
import AIAdvisorPage from './pages/AIAdvisorPage';
import MarketAccessPage from './pages/MarketAccessPage';
import FinancePage from './pages/FinancePage';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage';
import BuyerDashboardPage from './pages/buyer/BuyerDashboardPage';
import BrowseFarmsPage from './pages/buyer/BrowseFarmsPage';
import FarmProfilePage from './pages/buyer/FarmProfilePage';
import WatchlistPage from './pages/buyer/WatchlistPage';
import ProcurementPage from './pages/buyer/ProcurementPage';
import QualityReportsPage from './pages/buyer/QualityReportsPage';
import BuyerProfilePage from './pages/buyer/BuyerProfilePage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import FarmOnboardingPage from './pages/admin/FarmOnboardingPage';
import DeviceManagementPage from './pages/admin/DeviceManagementPage';
import { 
  FarmerAccountsPage, 
  BuyerAccountsPage, 
  ExtensionServicesPage, 
  AnalyticsPage, 
  SettingsPage,
  AdminProfilePage
} from './pages/admin/PlaceholderPages';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <LandingPage />
  },
  {
    name: 'Login',
    path: '/login',
    element: <LoginPage />,
    visible: false
  },
  {
    name: 'Signup',
    path: '/signup',
    element: <SignupPage />,
    visible: false
  },
  // Farmer Portal Routes
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <DashboardPage />,
    visible: false
  },
  {
    name: 'Farm Map',
    path: '/farm-map',
    element: <FarmMapPage />,
    visible: false
  },
  {
    name: 'Crop Monitor',
    path: '/crop-monitor',
    element: <CropMonitorPage />,
    visible: false
  },
  {
    name: 'AI Advisor',
    path: '/ai-advisor',
    element: <AIAdvisorPage />,
    visible: false
  },
  {
    name: 'Market Access',
    path: '/market-access',
    element: <MarketAccessPage />,
    visible: false
  },
  {
    name: 'Finance',
    path: '/finance',
    element: <FinancePage />,
    visible: false
  },
  {
    name: 'Reports',
    path: '/reports',
    element: <ReportsPage />,
    visible: false
  },
  {
    name: 'Profile',
    path: '/profile',
    element: <ProfilePage />,
    visible: false
  },
  // Buyer Portal Routes
  {
    name: 'Buyer Dashboard',
    path: '/buyer/dashboard',
    element: <BuyerDashboardPage />,
    visible: false
  },
  {
    name: 'Browse Farms',
    path: '/buyer/browse',
    element: <BrowseFarmsPage />,
    visible: false
  },
  {
    name: 'Farm Profile',
    path: '/buyer/farm/:id',
    element: <FarmProfilePage />,
    visible: false
  },
  {
    name: 'Watchlist',
    path: '/buyer/watchlist',
    element: <WatchlistPage />,
    visible: false
  },
  {
    name: 'Procurement',
    path: '/buyer/procurement',
    element: <ProcurementPage />,
    visible: false
  },
  {
    name: 'Quality Reports',
    path: '/buyer/quality-reports',
    element: <QualityReportsPage />,
    visible: false
  },
  {
    name: 'Buyer Profile',
    path: '/buyer/profile',
    element: <BuyerProfilePage />,
    visible: false
  },
  // Admin Portal Routes
  {
    name: 'Admin Dashboard',
    path: '/admin/dashboard',
    element: <AdminDashboardPage />,
    visible: false
  },
  {
    name: 'Farm Onboarding',
    path: '/admin/onboarding',
    element: <FarmOnboardingPage />,
    visible: false
  },
  {
    name: 'Device Management',
    path: '/admin/devices',
    element: <DeviceManagementPage />,
    visible: false
  },
  {
    name: 'Farmer Accounts',
    path: '/admin/farmers',
    element: <FarmerAccountsPage />,
    visible: false
  },
  {
    name: 'Buyer Accounts',
    path: '/admin/buyers',
    element: <BuyerAccountsPage />,
    visible: false
  },
  {
    name: 'Extension Services',
    path: '/admin/extension',
    element: <ExtensionServicesPage />,
    visible: false
  },
  {
    name: 'Analytics',
    path: '/admin/analytics',
    element: <AnalyticsPage />,
    visible: false
  },
  {
    name: 'Settings',
    path: '/admin/settings',
    element: <SettingsPage />,
    visible: false
  },
  {
    name: 'Admin Profile',
    path: '/admin/profile',
    element: <AdminProfilePage />,
    visible: false
  }
];

export default routes;
