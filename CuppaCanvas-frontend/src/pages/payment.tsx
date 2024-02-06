// import axios from "axios";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import KhaltiCheckout from "khalti-checkout-web";
//
// import "../css/payment.css";
// import HomeNavbar from "./Navbar&Modals/HomeNavbar.tsx";
//
// const myKey = {
//     publicTestKey: "test_public_key_402c2b0e98364222bb1c1ab02369cefd",
//     secretKey: "test_secret_key_d46fe88dee964ecfbd0f699a9985f2d4",
// };
//
// const config = {
//     publicKey: myKey.publicTestKey,
//     productIdentity: "123766",
//     productName: "Feast Food",
//     productUrl: "http://localhost:3000",
//     eventHandler: {
//         onSuccess(payload) {
//             console.log(payload);
//             const data = {
//                 token: payload.token,
//                 amount: payload.amount,
//             };
//
//             axios
//                 .get(
//                     `https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${myKey.secretKey}`
//                 )
//                 .then((response) => {
//                     console.log(response.data);
//                     alert("Thank you for your generosity");
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         },
//         onError(error) {
//             console.log(error);
//         },
//         onClose() {
//             console.log("widget is closing");
//         },
//     },
//     paymentPreference: [
//         "KHALTI",
//         "EBANKING",
//         "MOBILE_BANKING",
//         "CONNECT_IPS",
//         "SCT",
//     ],
// };
//
// const Payment = () => {
//     const location = useLocation();
//     const currentLocation = location.pathname;
//
//     const checkout = new KhaltiCheckout(config);
//
//     // State for the selected delivery option
//     const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("");
//
//     // State for the selected payment option
//     const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
//
//     const handleConfirmOrder = () => {
//         if (selectedPaymentOption === "Pay Via Khalti") {
//             checkout.show({ amount: 1000 });
//         } else if (selectedPaymentOption === "Cash on delivery") {
//             alert("Order placed successfully!");
//             // Add any additional logic for cash on delivery
//         } else {
//             alert("Please select a valid payment option");
//         }
//     };
//
//     return (
//         <div className="payment-container">
//             <HomeNavbar activePage={currentLocation} />
//             <div className="payment-text-div">
//                 <h1>
//                     Payment <b>Page</b>
//                 </h1>
//             </div>
//             <div className="payment-main-container">
//                 <table className="payment-table">
//                     <thead>
//                     <tr>
//                         <th colSpan="2">Delivery Section</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td>
//                             <select
//                                 className="select-delivery-option"
//                                 value={selectedDeliveryOption}
//                                 onChange={(e) => setSelectedDeliveryOption(e.target.value)}
//                             >
//                                 <option>Select Delivery Mode</option>
//                                 <option>Self PickUp</option>
//                                 <option>Home Delivery</option>
//                             </select>
//                         </td>
//                     </tr>
//                     </tbody>
//                 </table>
//
//                 <table className="payment-table">
//                     <thead>
//                     <tr>
//                         <th colSpan="2">Receipt</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td>Sub-total:</td>
//                         <td>$100</td>
//                     </tr>
//                     {selectedDeliveryOption === "Home Delivery" && (
//                         <tr>
//                             <td>Delivery-Fee:</td>
//                             <td>$10</td>
//                         </tr>
//                     )}
//                     <tr>
//                         <td>Total:</td>
//                         <td>$110</td>
//                     </tr>
//                     </tbody>
//                 </table>
//
//                 <table className="payment-table">
//                     <thead>
//                     <tr>
//                         <th colSpan="2">Pay Via</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td>
//                             <select
//                                 className="select-payment-option"
//                                 onChange={(e) => setSelectedPaymentOption(e.target.value)}
//                             >
//                                 <option>Select Payment Option</option>
//                                 <option>Cash on delivery</option>
//                                 <option>Pay Via Khalti</option>
//                             </select>
//                         </td>
//                     </tr>
//                     </tbody>
//                 </table>
//
//                 <div className="confirm-order">
//                     <button onClick={handleConfirmOrder} className="confirm-button">
//                         Confirm Order
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Payment;
import { useState } from "react";
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

            // Your axios request here to handle payment success

            alert("Thank you for your generosity");
        },
        onError(error) {
            console.log(error);
            alert("An error occurred during payment. Please try again.");
        },
        onClose() {
            console.log("Widget is closing");
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

    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("");
    const [selectedPaymentOption, setSelectedPaymentOption] = useState("");

    const handleConfirmOrder = () => {
        if (selectedPaymentOption === "Pay Via Khalti") {
            checkout.show({ amount: 1000 });
        } else if (selectedPaymentOption === "Cash on delivery") {
            alert("Order placed successfully!");
            // Additional logic for cash on delivery
        } else {
            alert("Please select a valid payment option");
        }
    };

    return (
        <div className="payment-container">
            <HomeNavbar activePage={currentLocation} />
            <div className="payment-content">
                <h1 className="payment-heading">
                    Payment Page
                </h1>
                <div className="payment-sections">
                    <div className="payment-section">
                        <h2>Delivery Section</h2>
                        <select
                            className="select-delivery-option"
                            value={selectedDeliveryOption}
                            onChange={(e) => setSelectedDeliveryOption(e.target.value)}
                        >
                            <option>Select Delivery Mode</option>
                            <option>Self Pickup</option>
                            <option>Home Delivery</option>
                        </select>
                    </div>
                    <div className="payment-section">
                        <h2>Receipt</h2>
                        <div className="receipt">
                            <div>Sub-total: $100</div>
                            {selectedDeliveryOption === "Home Delivery" && (
                                <div>Delivery Fee: $10</div>
                            )}
                            <div>Total: $110</div>
                        </div>
                    </div>
                    <div className="payment-section">
                        <h2>Pay Via</h2>
                        <select
                            className="select-payment-option"
                            value={selectedPaymentOption}
                            onChange={(e) => setSelectedPaymentOption(e.target.value)}
                        >
                            <option>Select Payment Option</option>
                            <option>Cash on delivery</option>
                            <option>Pay Via Khalti</option>
                        </select>
                    </div>
                </div>
                <div className="confirm-order">
                    <button className="confirm-button" onClick={handleConfirmOrder}>
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
