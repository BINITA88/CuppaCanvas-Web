import "../css/adminSidebar.css"
import {MdSpaceDashboard, MdTableRestaurant} from "react-icons/md";
import { BiSolidCategoryAlt} from "react-icons/bi";
import {TiHome} from "react-icons/ti";
import {IoMdLogOut} from "react-icons/io";
import {FaBowlFood} from "react-icons/fa6";
import {Link} from "react-router-dom"
import React from "react";
import {TbBrandBooking} from "react-icons/tb";
import {FaUserCog} from "react-icons/fa";
import {IoNewspaper} from "react-icons/io5";
import {BsFillCalendar2EventFill} from "react-icons/bs";


interface AdminSidebarProps {
    activePage: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage }) => {
    return(
        <>
            <div className={"admin-sidebar"}>
                <div className={"sidebar-brand"}>
                    <h1> <span><TiHome style={{fontSize:"2.1rem", marginBottom:"-4px", color:"black"}} /></span>Feast</h1>
                </div>

                <div className={"sidebar-options"}>
                    <ul className={"sidebar-list"}>
                        <Link to={"/AdminDashboard"}>
                            <li className={`sidebar-list-item ${activePage === "/AdminDashboard" ? "active" : ""}`}>
                                <span><MdSpaceDashboard style={{fontSize:"18px",marginBottom:"-3px"}}/></span>
                                <a>Dashboard</a>
                            </li>
                        </Link>
                        <Link to={"/CustomerPage"}>
                            <li className={`sidebar-list-item ${activePage === "/CustomerPage" ? "active" : ""}`}>
                                <span><FaUserCog style={{fontSize:"18px",marginBottom:"-3px"}}/></span>
                                <a>Customers</a>
                            </li>
                        </Link>

                        <Link to={"##"}>
                            <li className={`sidebar-list-item ${activePage === "##" ? "active" : ""}`}>
                                <span><IoNewspaper style={{fontSize:"18px",marginBottom:"-3px"}}/></span>
                                <a>Orders</a>
                            </li>
                        </Link>

                        {/*<Link to={"/booking"}>*/}
                        {/*    <li className={`sidebar-list-item ${activePage === "/booking" ? "active" : ""}`}>*/}
                        {/*        <span><TbBrandBooking style={{fontSize:"20px",marginBottom:"-3px"}}/></span>*/}
                        {/*        <a>Booking</a>*/}
                        {/*    </li>*/}
                        {/*</Link>*/}

                        {/*<Link to={"/AdminEvent"}>*/}
                        {/*    <li className={`sidebar-list-item ${activePage === "/AdminEvent" ? "active" : ""}`}>*/}
                        {/*        <span><BsFillCalendar2EventFill style={{fontSize:"18px",marginBottom:"-3px"}}/></span>*/}
                        {/*        <a>Events</a>*/}
                        {/*    </li>*/}
                        {/*</Link>*/}

                        <Link to={"/ManageCategory"}>
                            <li className={`sidebar-list-item ${activePage === "/ManageCategory" ? "active" : ""}`}>
                                <span><BiSolidCategoryAlt style={{fontSize:"18px",marginBottom:"-3px"}}/></span>
                                <a>Manage Category</a>
                            </li>
                        </Link>

                        <Link to={"/ManageItem"}>
                            <li className={`sidebar-list-item ${activePage === "/ManageItem" ? "active" : ""}`}>
                                <span><FaBowlFood style={{fontSize:"18px",marginBottom:"-3px"}}/></span>
                                <a>Manage items</a>
                            </li>
                        </Link>

                        {/*<Link to={"/manageTable"}>*/}
                        {/*    <li className={`sidebar-list-item ${activePage === "/manageTable" ? "active" : ""}`}>*/}
                        {/*        <span><MdTableRestaurant style={{fontSize:"20px",marginBottom:"-3px"}}/></span>*/}
                        {/*        <a>ManageTable</a>*/}
                        {/*    </li>*/}
                        {/*</Link>*/}

                        {/*<Link to={"/reservedTable"}>*/}
                        {/*    <li className={`sidebar-list-item ${activePage === "/reservedTable" ? "active" : ""}`}>*/}
                        {/*        <span><TbBrandBooking style={{fontSize:"20px",marginBottom:"-3px"}}/></span>*/}
                        {/*        <a>ReservedTable</a>*/}
                        {/*    </li>*/}
                        {/*</Link>*/}

                    </ul>
                </div>



                <div className={"sidebar-btn"}>
                    <button type={"button"}><span><IoMdLogOut style={{fontSize:"1.3rem" ,marginBottom:"-3px",marginRight:"3px"}}/></span>Log Out</button>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar