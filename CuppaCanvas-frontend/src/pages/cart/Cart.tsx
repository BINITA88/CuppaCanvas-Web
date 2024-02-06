import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import "../../css/Cart.css"; // Import the new CSS file
import HomeNavbar from "../Navbar&Modals/HomeNavbar.tsx";

const Cart = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    const { data: cartData, refetch } = useQuery({
        queryKey: ["GET_CART_DATA"],
        queryFn() {
            return axios.get("http://localhost:8080/cart/getAll");
        },
    });

    const [cartItems, setCartItems] = useState(cartData?.data || []);

    const updateQuantity = (itemId, newQuantity) => {
        const updatedCartItems = cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );

        axios.put(`http://localhost:8080/cart/updateQuantity/${itemId}`, {
            quantity: newQuantity,
        });

        setCartItems(updatedCartItems);
        refetch();
    };

    const deleteByIdApi = useMutation({
        mutationKey: ["DELETE_CART_BY_ID"],
        mutationFn(id) {
            return axios.delete("http://localhost:8080/cart/deleteById/" + id);
        },
        onSuccess() {
            refetch();
        },
    });

    const cartTotal = cartData?.data.reduce(
        (total, item) => total + item.total_price * item.quantity,
        0
    );

    return (
        <div className="cart-container">
            <HomeNavbar activePage={currentLocation} />
            <div className="cart-text-div">
                <h1>
                    Cart <b>Page</b>
                </h1>
            </div>
            <div className="cart-main-container">
                <table className="cart-table">
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartData?.data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.item.itemName}</td>
                            <td>Rs. {item.total_price}</td>
                            <td>
                                <div className="quantity-control">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>Rs. {item.total_price * item.quantity}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                "Are you sure you want to delete this item?"
                                            )
                                        ) {
                                            deleteByIdApi.mutate(item.id);
                                        }
                                    }}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="cart-total">
                <h3> Cart Total: Rs. {cartTotal}</h3>
                <Link to="/payment">
                    <button className="checkout-button">CHECKOUT</button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;
