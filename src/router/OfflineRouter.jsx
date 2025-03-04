import { createBrowserRouter } from "react-router-dom";
import HomeOffline from "../screens/OfflineScreens/HomeOffline";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Login from "../screens/OfflineScreens/Login";
import Register from "../screens/OfflineScreens/Register";
import PaymentCancel from "../screens/OfflineScreens/PaymentCancel";
import Subscription from "../screens/OfflineScreens/Subscription";

const OfflineRouter = createBrowserRouter([
    {
        // Element retourné sur toutes les vues
        element: <HomeOffline />,

        // Element retourné  en cas d'erreur
        errorElement: <ErrorPage />,
        children: [
            {
                // Chemin de la vue
                path: "/",
                // Elément retourné
                element: <Login />,
            },
            {
                path : "/register",
                element: <Register />
            },
            {
                path : "/subscription",
                element: <Subscription />
            },
            {
                path : "/cancel",
                element: <PaymentCancel />
            }
        ],
    }
]);

export default OfflineRouter;