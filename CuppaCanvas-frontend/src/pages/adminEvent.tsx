import {useLocation, useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import AdminSidebar from "./adminSidebar.tsx";
import {CiEdit} from "react-icons/ci";
import "../../src/css/adminEvent.css"
import {MdDelete} from "react-icons/md";
import React from "react";

function AdminEvent(){

    const location = useLocation();
    const currentLocation = location.pathname;
    const navigate = useNavigate();

    // const[search, setSearch] = useState('');

    // Fetching event type from API
    const{data} = useQuery({
    queryKey:["GET_EVENT_DATA"],
    queryFn(){
    return axios.get("http://localhost:8080/event/getAll")
        }
    })

    const filteredData = data?.data;
    console.log(filteredData)

    // Fetching Booked event data from API
    const{data:bookedEventData,refetch} = useQuery({
        queryKey:["GET_BOOKED_EVENT_DATA"],
        queryFn(){
            return axios.get("http://localhost:8080/eventBooking/getAll")
        }
    })

    // Function to format date and time
    const formatDate = (dateString) => {
        const options = { month: "2-digit", day: "2-digit", year: "numeric" };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return `${formattedDate}`;
    };

    const formatTime = (timeString) => {
        const options = { hour: "numeric", minute: "2-digit", hour12: true };
        const formattedTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString(undefined, options);
        return `${formattedTime}`;
    };

    console.log("baab"+bookedEventData?.data.eventTime);

    //Deleting booked event data
    const deleteByIdApi=useMutation(
        {
            mutationKey:["DELETE_ITEM_BY_ID"],
            mutationFn(id:number){
                return axios.delete("http://localhost:8080/eventBooking/delete/"+id);
            },onSuccess(){refetch()}
        }
    )


    return(
            <>
            <div className={"customer-page"}>
                <AdminSidebar activePage={currentLocation}/>

                <div className={"customer-page-right"}>
                    <header className={"customer-page-header"}>
                        <h1>Events</h1>
                    </header>
                    <div className={"customer-page-main"}>
                        <div className={"no-of-customer"}>
                            <h2>Events: </h2>
                        </div>
                        <table className={"event-table1"}>
                            <thead>
                                 <tr>
                                    <th className={"id-box5"}>ID</th>
                                    <th className={"name-box5"}>Name</th>
                                    <th className={"description-box"}>Description</th>
                                    <th className={"image-box5"}>Image</th>
                                    <th className={"price-box5"}>Price</th>
                                    <th className={"edit-box5"}>Action</th>
                                </tr>
                            </thead>
                             <tbody>
                                {filteredData?.sort((a, b) => a.id - b.id)
                                .map((customer) => (
                                    <tr key={customer?.id}>
                                        <td>{customer?.id}</td>
                                        <td>{customer?.eventName}</td>
                                        <td>{customer?.eventDescription}</td>
                                        <td><img src={customer?.eventImage} height={"40px"}/></td>
                                        <td>{customer?.eventPrice}</td>
                                        <td>
                                            <button className={"edit-btn2"} onClick={()=>{
                                                navigate("/EditEvent/"+customer?.id);
                                                console.log(customer?.id)
                                            }}><CiEdit /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className={"no-of-customer"}>
                            <h2>Events Booked </h2>
                        </div>
                        <table className={"event-table2"}>
                            <thead>
                            <tr>
                                <th className={"id-box5"}>Customer's Name</th>
                                <th className={"name-box5"}>Event ID</th>
                                <th className={"date-box5"}>Date</th>
                                <th className={"image-box5"}>Time</th>
                                <th className={"request-box5"}>Additional Request</th>
                                <th className={"delete-box5"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookedEventData?.data.map((i) => (
                                <tr key={i?.id}>
                                    <td>{i?.user?.fullName}</td>
                                    <td>{i?.event?.id}</td>
                                    <td>{formatDate(i?.eventDate)}</td>
                                    <td>{formatTime(i?.eventTime)}</td>
                                    <td>{i?.specialRequest}</td>
                                    <td>
                                        <button className={"delete-btn3"} onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this category?")) {
                                                deleteByIdApi.mutate(i?.id);
                                            }
                                        }}><MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminEvent;
