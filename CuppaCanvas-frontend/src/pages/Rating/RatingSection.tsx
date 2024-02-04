import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import "../../css/RatingSection.css";

const RatingSection: React.FC = () => {
    const [rating, setRating] = useState<number>(0);
    const user: any = JSON.parse(localStorage.getItem("userDetails"));
    // console.log(user.id);
    const useApiCall = useMutation({
        mutationKey: ['POST_RATING'],
        mutationFn: async (payload: { value: number; userId: number }) => {
            try {
                const response = await axios.post('http://localhost:8080/api/ratings/submit', payload);
                // Handle the response based on your requirements
                console.log('Rating submitted successfully:', response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Failed to submit rating:', error.response?.data?.message || 'Unknown error');
                } else {
                    console.error('Failed to submit rating:', error.message || 'Unknown error');
                }
            }
        },
    });

    const fetchRatingByUser=async ()=>{
        try{

            const response=await axios.get(`http://localhost:8080/api/ratings/getRatingByUserId/${user.id}`)

            return response.data.value;

        }catch(e){
            console.error("Failed to get rating");
        }
    };

    const {data}= useQuery({
        queryKey:['ratingUser'],
        queryFn:async ()=>{
            const data=await fetchRatingByUser();
            await setRating(data);
            return data;
        },

    });
    // console.log("Helo",typeof data);
    console.log(rating);



    const handleRating = async (value: number) => {
        try {
            const userId = user.id;

            await useApiCall.mutateAsync({ value, userId });
            setRating(value);
        } catch (error) {
            console.error('Failed to submit rating:', error);
        }
    };

    const renderStars = () => {
        const stars: JSX.Element[] = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i <= rating ? 'star active' : 'star'}
                    onClick={() => handleRating(i)}
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="rating">
            <div className="rate">
                <div className="stars">
                    {renderStars()}
                </div>
            </div>
        </div>
    );
};

export default RatingSection;
