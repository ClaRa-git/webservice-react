import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OnlineScreens/Home";
import PaymentSuccess from "../screens/OfflineScreens/PaymentSuccess";
import Search from "../screens/OnlineScreens/Search";
import Library from "../screens/OnlineScreens/Library";
import Playlist from "../screens/OnlineScreens/Playlist";
import Wishlist from "../screens/OnlineScreens/Wishlist";
import Account from "../screens/OnlineScreens/Account";
import Detail from "../screens/OnlineScreens/Detail";

const OnlineRouter = createBrowserRouter([
    {
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/success",
                element: <PaymentSuccess />
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/library",
                element: <Library />
            },
            {
                path: "/add-playlist",
                element: <Playlist />
            },
            {
                path: "/wishlist",
                element: <Wishlist />
            },
            {
                path: "/details/:id",
                element: <Detail />
            },
            {
                path: "/account/:id",
                element: <Account />
            }
        ]
    }
]);

export default OnlineRouter;