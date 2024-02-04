import axios from "axios";
import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import KhaltiCheckout from "khalti-checkout-web";
import HomeNavbar from "./Navbar&Modals/HomeNavbar";
import "../css/payment.css";


const myKey = {
    publicTestKey: "test_public_key_402c2b0e98364222bb1c1ab02369cefd",
    secretKey: "test_secret_key_d46fe88dee964ecfbd0f699a9985f2d4",
};

const config = {
    publicKey: myKey.publicTestKey,
    productIdentity: "123766",
    productName: "Feast Food",
    productUrl: "http://localhost:3000",
    eventHandler: {
        onSuccess(payload) {
            console.log(payload);
            const data = {
                token: payload.token,
                amount: payload.amount,
            };

            axios
                .get(
                    `https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${myKey.secretKey}`
                )
                .then((response) => {
                    console.log(response.data);
                    alert("Thank you for your generosity");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        onError(error) {
            console.log(error);
        },
        onClose() {
            console.log("widget is closing");
        },
    },
    paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
    ],
};

const Payment = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    const checkout = new KhaltiCheckout(config);
    const buttonStyles = {
        backgroundColor: "#f3ad16",
        padding: "10px",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold",
        border: "1px solid white",
    };

    //delivery dropdown logic



    // payment dropdown logic
    const [selectedPaymentOption, setSelectedPaymentOption] = useState("");

    const handleConfirmOrder = () => {
        if (selectedPaymentOption === "Pay Via Khalti") {
            checkout.show({ amount: 1000 });
        } else if (selectedPaymentOption === "Cash on delivery") {
            alert("Order placed successfully!");
            // Add any additional logic for cash on delivery
        } else {
            alert("Please select a valid payment option");
        }
    };

    // State for the selected delivery option
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<string>("");


    return (
        <>
            <div className={"payment-container"}>
                <HomeNavbar activePage={currentLocation} />
                <div className={"payment-text-div"}><h1> Payment<b>Page</b></h1></div>
                <div className="half-hr" />

                <div className={"delivery-mode-container"}>
                    <div className={"delivery-method"}>
                        <div className={"delivery-text"}>
                            <h2> Delivery Section</h2>
                        </div>
                        <div className={"dropdown-delivery"}>
                            <select
                                className={"select-delivery-option"}
                                value={selectedDeliveryOption}
                                onChange={(e) => setSelectedDeliveryOption(e.target.value)}
                            >
                                <option>Select Delivery Mode</option>
                                <option>Self PickUp</option>
                                <option>Home Delivery</option>
                            </select>
                        </div>
                    </div>

                    <div className={"receipt-container"}>
                        <div className={"receipt-container-text"}>
                            <h2> Receipt</h2>
                        </div>
                        <div className={"receipt-text"}>
                            <div className={"sub-total-box"} placeholder={"SUB-TOTAL"}>
                                Sub-total:
                            </div>
                            {selectedDeliveryOption === "Home Delivery" && (
                                <div className={'delivery-fee-box'} placeholder={"DELIVERY-FEE"}>
                                    Delivery-Fee:
                                </div>
                            )}
                            <h5>----------------------------------------------</h5>
                            <div className={"Total-box5"} placeholder={"TOTAL"}>
                                Total:
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={"payment-mode-container"}>
                            <div className={"payment-text"}>
                                <h2> Pay Via</h2>
                            </div>
                            <div className={"dropdown-payment"}>
                                <select
                                    className={"select-payment-option"}
                                    onChange={(e) => setSelectedPaymentOption(e.target.value)}
                                >
                                    <option>Select Delivery Option</option>
                                    <option>Cash on delivery</option>
                                    <option>Pay Via Khalti</option>
                                </select>
                            </div>
                        </div>
                        <hr />
                        <div className={"confirm-order"}>
                            <button onClick={handleConfirmOrder} style={buttonStyles}>
                                Confirm Order
                            </button>
                        </div>
                    </div>

                </div>
                <hr/>
            </div>
        </>
    );
};

export default Payment;
