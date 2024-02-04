import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import ManageCategory from "./pages/ManageCategory.tsx";
import ManageItem from "./pages/ManageItem.tsx";
import UserProfileView from "./pages/UserProfileView.tsx";
import Payment from "./pages/payment.tsx";
import CustomizePizzaPage from "./pages/CustomizePizza/CustomizePizzaPage.tsx";
import Cart from "./pages/cart/Cart.tsx";
import EditCategory from "./pages/editCategory.tsx";
import Homedelivery from "./pages/homedelivery.tsx";
import HomeDelivery from "./pages/homedelivery.tsx";
import RatingSection from "./pages/Rating/RatingSection.tsx";
import CustomerPage from "./pages/customerPage.tsx";
import AdminEvent from "./pages/adminEvent.tsx";
import EditItem from "./pages/editItem.tsx";
import ForgotPass1 from "./pages/forgotpassword/ForgotPass1.tsx";
import Home from "./pages/ourMenu.tsx";


const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={createBrowserRouter([
                    {path: "/AdminDashboard", element: <AdminDashboard/>},
                    {path: "/ManageCategory", element: <ManageCategory/>},
                    {path: "/ManageCategory", element: <ManageCategory/>},
                    {path: "/edit/:pk_id", element: <EditCategory/>},
                    {path: "/ManageItem", element: <ManageItem/>},
                    {path: "/editItem/:pk_id", element: <EditItem/>},
                    {path: "/CustomerPage", element: <CustomerPage/>},
                    {path: "/AdminEvent", element: <AdminEvent/>},
                    {path: "/Home", element: <Home/>},
                    {path: "/UserProfileView", element: <UserProfileView/>},
                    {path: "/payment", element: <Payment/>},
                    {path: "/homedelivery", element: <Homedelivery/>},
                    {path: "/customizepizza", element: <CustomizePizzaPage/>},
                    {path: "/cart", element: <Cart/>},
                    {path: "/HomeDelivery", element: <HomeDelivery/>},
                    {path: "/CustomizePizza", element: <CustomizePizzaPage/>},
                    {path:"/Rate",element:<RatingSection/>},
                    {path:"/Rate",element:<RatingSection/>},
                    {path:"/f1",element:<ForgotPass1/>}

                ])} />
            </QueryClientProvider>
        </>
    )
}

export default App
