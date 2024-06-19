import { createBrowserRouter } from "react-router-dom";
import MainLayoutUnsigned from "../layouts/MainLayoutUnsigned";
import NotFoundPage from "../pages/common/NotFoundPage";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";

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
    }
])

export default router;