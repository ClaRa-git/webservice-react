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
import ArtistDetail from "../screens/OnlineScreens/ArtistDetail";
import EditInfo from "../screens/OnlineScreens/Account/EditInfo";
import AvatarList from "../screens/OnlineScreens/Account/AvatarList";
import ManageSubscription from "../screens/OnlineScreens/Account/ManageSubscription";
import PlaylistDetail from "../screens/OnlineScreens/PlaylistDetail";

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
                path: "/playlist",
                element: <Playlist />
            },
            {
                path: "playlist-detail/:id",
                element: <PlaylistDetail />
            },
            {
                path: "/wishlist",
                element: <Wishlist />
            },
            {
                path: "/detail/:id",
                element: <Detail />
            },

            {
                path: "/account/:id",
                element: <Account />
            },
            {
                path: "/artist-detail/:id",
                element: <ArtistDetail  />
            },
            {
                path: "edit-info",
                element: <EditInfo />
            },
            {
                path: "edit-avatar",
                element: <AvatarList />
            },
            {
                path: "manage-subscription/:id",
                element: <ManageSubscription />
            }

        ]
    }
]);

export default OnlineRouter;