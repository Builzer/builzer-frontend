import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
// import { ConfigProvider } from "antd";

import router from "./routes";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <ConfigProvider theme={{ token: { colorPrimary: '#333333' } }}>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} fallbackElement={''} />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </RecoilRoot>
  </ConfigProvider>

);

