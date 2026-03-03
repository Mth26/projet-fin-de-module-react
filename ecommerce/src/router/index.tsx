import React from "react"
import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"
import Home from "../pages/Home"
import Products from "../pages/Products"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Categories from "../pages/Categories"
import ProductDetail from "../pages/ProductDetail"
import Profile from "../pages/Profile"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"

function PageEnConstruction({ nom }: { nom: string }) {
    return (
        <div style={{ padding: "40px", textAlign: "center", paddingTop: "100px" }}>
            <h1 style={{ fontFamily: "Bebas Neue", fontSize: "48px" }}>
                {nom}
            </h1>
            <p style={{ fontFamily: "Inter", color: "#404040" }}>
                Cette page sera créée prochainement
            </p>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "products", element: <Products /> },
            { path: "products/:id", element: <ProductDetail /> },
            { path: "categories", element: <Categories /> },
            { path: "contact", element: <PageEnConstruction nom="CONTACT" /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "profile", element: <Profile /> },
            { path: "cart", element: <Cart /> },
            { path: "checkout", element: <Checkout /> },
        ],
    },
])

export default router
