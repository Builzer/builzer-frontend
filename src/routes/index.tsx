import { createBrowserRouter } from "react-router-dom"
import NotFoundPage from "../pages/NotFoundPage"
import MainLayoutUnsigned from "../layouts/MainLayoutUnsigned"
import MainPage from "../pages/MainPage"
import LoginPage from "../pages/LoginPage"
import MainLayoutSigned from "../layouts/MainLayoutSigned"
import OverviewPage from "../pages/overview/OverviewPage"
import OverviewSelectPage from "../pages/overview/OverviewSelectPage"

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
            { path: 'select', element: <OverviewSelectPage /> }
        ]
    }
])

export default router