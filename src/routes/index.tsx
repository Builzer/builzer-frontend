import { createBrowserRouter } from "react-router-dom"
import NotFoundPage from "../pages/NotFoundPage"
import MainLayoutUnsigned from "../layouts/MainLayoutUnsigned"
import MainPage from "../pages/MainPage"
import LoginPage from "../pages/LoginPage"
import MainLayoutSigned from "../layouts/MainLayoutSigned"
import OverviewPage from "../pages/overview/OverviewPage"
import OverviewSelectPage from "../pages/overview/OverviewSelectPage"
import OverviewSettingPage from "../pages/overview/OverviewSettingPage"
import OverviewDeployPage from "../pages/overview/OverviewDeployPage"
import OverviewDeployDonePage from "../pages/overview/OverviewDeployDonePage"
import ManagementPage from "../pages/ManagementPage"
import MonitoringPage from "../pages/MonitoringPage"

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayoutUnsigned />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, path: '', element: <MainPage /> }
        ]
    },
    {
        path: '/login',
        element: <MainLayoutUnsigned />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, path: '', element: <LoginPage /> }
        ]
    },
    {
        path: '/overview',
        element: <MainLayoutSigned />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, path: '', element: <OverviewPage /> },
            { path: 'select', element: <OverviewSelectPage /> },
            { path: 'setting', element: <OverviewSettingPage /> },
            { path: 'deploy', element: <OverviewDeployPage /> },
            { path: 'done', element: <OverviewDeployDonePage /> }
        ]
    },
    {
        path: '/management',
        element: <MainLayoutSigned />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, path: '', element: <ManagementPage /> }
        ]
    },
    {
        path: '/monitoring',
        element: <MainLayoutSigned />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, path: '', element: <MonitoringPage /> }
        ]
    }
])

export default router