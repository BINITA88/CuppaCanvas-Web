// CustomizePizzaPage.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { FaRegWindowClose } from 'react-icons/fa';
import '../../css/CustomizePizza.css';

const staticPrices = {
    addExtraCheese: 60,
    addExtraMeat: 200,
    addExtraMozzarella: 35,
    addExtraBasil: 30,
    addExtraVeggies: 100,
};



const CustomizePizzaPage: React.FC = () => {
    const [customization, setCustomization] = useState({
        addExtraCheese: false,
        addExtraMeat: false,
        addExtraMozzarella: false,
        addExtraBasil: false,
        addExtraVeggies: false,
    });

    const [messages, setMessages] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(800); // Initial base price

    const useApiCall = useMutation({
        mutationKey: ['POST_CUSTOMIZATION'],
        mutationFn: async (payload: any) => {
            try {
                const response = await axios.post('http://localhost:8080/api/pizzas/save', payload);
                return response.data; // Assuming the backend responds with data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new Error(error.response?.data?.message || 'Failed to customize pizza');
                } else {
                    throw new Error('Failed to customize pizza');
                }
            }
        },
    });

    const handleCheckboxChange = (option: string, price: number) => {
        setCustomization((prevCustomization) => ({
            ...prevCustomization,
            [option]: !prevCustomization[option],
        }));

        // Add a message for the selected option
        const newMessage = ` ${option} ${customization[option] ? 'removed' : 'added'} - Rs.${price}`;
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Update the total price
        setTotalPrice((prevTotalPrice) => prevTotalPrice + (customization[option] ? -price : price));

        setTimeout(() => {
            setMessages((prevMessages) => prevMessages.slice(0, -1));
        }, 3000);
    };

    const handleCustomizeClick = async () => {
        // Prepare payload for API call
        const payload = {
            addExtraCheese: customization.addExtraCheese,
            addExtraMeat: customization.addExtraMeat,
            addExtraMozzarella: customization.addExtraMozzarella,
            addExtraBasil: customization.addExtraBasil,
            addExtraVeggies: customization.addExtraVeggies,
        };

        try {
            // Make API call only when the Customize button is clicked
            await useApiCall.mutateAsync(payload);

            // Reset customization data and messages after successful API call
            setCustomization({
                addExtraCheese: false,
                addExtraMeat: false,
                addExtraMozzarella: false,
                addExtraBasil: false,
                addExtraVeggies: false,
            });
            setTotalPrice(800); // Reset to initial base price
            setMessages([]);
        } catch (error) {
            console.error('Failed to customize pizza:', error);
        }
    };

    return (
        <>
            <div className="menu">
                <div className={"closee"}>
                    <button className="close-button">
                        <FaRegWindowClose />
                    </button>
                </div>
                <div className="menu-heading">Customize Your Order</div>
                <div className={"line-top"}></div>
                <div className="menu-items">
                    <div className="item-left">
                        <div className={"sub-heading-left"}>Items</div>
                        {Object.entries(staticPrices).map(([option, price]) => (
                            <div key={option} className="item">
                                <input
                                    className={"tick"}
                                    type={"checkbox"}
                                    checked={customization[option]}
                                    onChange={() => handleCheckboxChange(option, price)}
                                />
                                {` ${option.replace(/([A-Z])/g, ' $1').trim()}`}
                                <div className="itemprice">Rs.{price}</div>
                            </div>
                        ))}
                    </div>
                    <div className="item-right">
                        <div className={"sub-heading-right"}>Price</div>

                    </div>
                </div>
                <div className={"line-bottom"}></div>
                <div className={"price22"}>
                    <div className={"price-real"}>Total Price</div>
                    <div className="item-price">Rs.{totalPrice}</div>
                </div>
                <div className={"send-button"}>
                    <button className={"customize-button"} onClick={handleCustomizeClick}>
                        Customize
                    </button>
                </div>
            </div>

            {/* Messages Section */}
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message}
                    </div>
                ))}
            </div>
        </>
    );
};

export default CustomizePizzaPage;
