import { createBrowserRouter } from "react-router-dom";
import MainLayoutUnsigned from "../layouts/MainLayoutUnsigned";
import NotFoundPage from "../components/common/NotFoundPage";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import OverviewPage from "../pages/OverviewPage";
import MainLayoutSigned from "../layouts/MainLayoutSigned";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayoutUnsigned />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, path: '', element: <MainPage /> }
        ]
    },
    {
        path: "/login",
        element: <MainLayoutUnsigned />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, path: '', element: <LoginPage /> }
        ]
    },
    {
        path: "/",
        element: <MainLayoutSigned />,
        errorElement: <NotFoundPage />,
        children: [
            { path: 'overview', element: <OverviewPage /> }
        ]
    }
])

export default router;