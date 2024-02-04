import "../css/AdminDashboard.css"
import {FaUserCog} from "react-icons/fa";
import AdminSidebar from "./adminSidebar.tsx";
import {Link, useLocation} from "react-router-dom";
import {BiSolidCategoryAlt} from "react-icons/bi";
import {FaBowlFood} from "react-icons/fa6";
import {GoHomeFill} from "react-icons/go";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

function AdminDashboard(){

    const location = useLocation(); // Use useLocation to get the current location
    const currentLocation = location.pathname;

    // Fetching categories from API
    const{data:categoryData} = useQuery({
        queryKey:["GETCATEGORY"],
        queryFn(){
            return axios.get("http://localhost:8080/category/findAll")
        }
    })

    // Fetching Items from API
    const{data:itemData} = useQuery({
        queryKey:["GETITEM"],
        queryFn(){
            return axios.get("http://localhost:8080/item/findAll")
        }
    })
    return(
        <>
            <div className={"admin-dashboard-page"}>
                <div className={"dashboard-left"} >
                    <AdminSidebar activePage={currentLocation} />
                </div>

                <div className={"dashboard-right"}>
                    <header className={"dashboard-header"}>
                        <h1>Dashboard</h1>

                        {/*<div className={"search-wrapper"}>*/}
                        {/*    <span><FaSearch /></span>*/}
                        {/*    <input type={"search"} placeholder={"Search here"}/>*/}
                        {/*</div>*/}

                        <div className={"user-wrapper"}>
                            <img src={"https://images.pexels.com/photos/14073969/pexels-photo-14073969.jpeg?auto=compress&cs=tinysrgb&w=800"} width={"40px"} height={"40px"} alt={"N"}/>
                            <div>
                                <h4>Admin</h4>
                                <small>Super admin</small>
                            </div>
                        </div>
                    </header>

                    <div className={"dashboard-main-content"}>
                        <div className={"d-main-content"}>
                            <div className={"dashboard-cards-container"}>
                                <Link to={"/CustomerPage"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>Customers</h2>
                                            <h3>{}13</h3>
                                        </div>
                                        <span><FaUserCog style={{fontSize:"4vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>
                                <Link to={"/ManageCategory"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>Categories</h2>
                                            <h3>{categoryData?.data.length}</h3>
                                        </div>
                                        <span><BiSolidCategoryAlt style={{fontSize:"4vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>
                                <Link to={"/ManageItem"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>Items</h2>
                                            <h3>{itemData?.data.length}</h3>
                                        </div>
                                        <span><FaBowlFood style={{fontSize:"3.8vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>
                                <Link to={"/"}>
                                    <div className={"dashboard-cards"}>
                                        <div className={"d-card=left"}>
                                            <h2>Go to</h2>
                                            <h3 style={{marginTop:"-0.6rem"}}>Home</h3>
                                        </div>
                                        <span><GoHomeFill style={{fontSize:"3.8vw",marginBottom:"-3px"}}/></span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default AdminDashboard

