import { createBrowserRouter } from "react-router-dom";
import MainLayoutNoHeader from "../layouts/MainLayoutNoHeader";
import NotFoundPage from "../pages/common/NotFoundPage";
import MainPage from "../pages/MainPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayoutNoHeader />,
        errorElement: <NotFoundPage />,
        children: [
            {index: true, path: '', element: <MainPage />}
        ]
    }
])

export default router;