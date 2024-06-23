import { createBrowserRouter } from "react-router-dom"
import NotFoundPage from "../pages/NotFoundPage"
import MainLayoutUnsigned from "../layouts/MainLayoutUnsigned"
import MainPage from "../pages/MainPage"
import LoginPage from "../pages/LoginPage"
import MainLayoutSigned from "../layouts/MainLayoutSigned"
import OverviewPage from "../pages/OverviewPage"

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
        path: '/',
        element: <MainLayoutSigned />,
        errorElement: <NotFoundPage />,
        children: [
            { path: 'overview', element: <OverviewPage /> }
        ]
    }
])

export default router