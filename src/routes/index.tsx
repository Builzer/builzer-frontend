import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/common/NotFoundPage";
import MainPage from "../pages/MainPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {index: true, path: '', element: <MainPage />}
        ]
    }
])

export default router;