
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {FaCartArrowDown, FaRegWindowClose, FaUser} from "react-icons/fa";
// import {IoMdMail} from "react-icons/io";
import {RiLockPasswordFill} from "react-icons/ri";
import gsap from "gsap";
import "../../css/LoginPage.css"
import "../../css/RegistrationPage.css"
import "../../css/HomeNavbar.css"
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaCircleUser} from "react-icons/fa6";
// import userProfileView from "../UserProfileView.tsx";
import UserProfileView from "../UserProfileView.tsx";
// import {toast} from "react-toastify";
// import {RxHamburgerMenu} from "react-icons/rx";


interface HomeNavbarProps {
    activePage: string;
}

interface LoginProps {
    onLoginSuccess: () => void;
}


const HomeNavbar: React.FC<HomeNavbarProps> = ({ activePage }) => {

    const [loginSuccess, setLoginSuccess] = useState(false);

    const navigate = useNavigate();


    // Login modal
    const [login_popup, setLModal] = useState(false);
    const toggleLoginModal = () => {
        setLModal(!login_popup);
        setRPopup(false); // Close the registration modal
    };

    // Registration modal
    const [register_popup, setRPopup] = useState(false);
    const toggleRegisterModal = () => {
        setRPopup(!register_popup);
        setLModal(false); // Close the login modal
    };

    if (login_popup || register_popup) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    useEffect(() => {
        const storedData = localStorage.getItem("userDetails");
        if (storedData) {
            setUser(JSON.parse(storedData));

            console.log(user)
        }
    }, []);

    useEffect(() => {
        const modalAnimation = (modalClass: string | null) => {
            if (modalClass) {
                gsap.from(`.${modalClass}`, {
                    duration: 0.3,
                    opacity: 0,
                    onComplete: () => {
                        // Callback when the animation is complete
                        if (login_popup) {
                            document.body.classList.add('active-login-modal');
                        } else if (register_popup) {
                            document.body.classList.add('active-register-modal');
                        }
                    },
                });
            }
        };
        modalAnimation(login_popup ? "login-modal" : (register_popup ? "register-modal" : null));

    }, [login_popup, register_popup]);

    const [userProfile , setUserProfile] = useState(false);

    //Register ko backend connection
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm();

    // const {errors}=formState;

    const useApiCall=useMutation({
        mutationKey:["POST_USER_CREATE"],
        mutationFn:(payload:any)=>{
            console.log(payload)
            return axios.post("http://localhost:8080/register/register",payload)
        },
        onSuccess: () => {
            difftoast();
            reset();
        },
    })

    const [user, setUser] = useState(null);

    // console.log("User",user.fullName)

    const useApiCallLogin = useMutation({
        mutationKey: ["POST_USER_LOGIN"],
        mutationFn: (payload: any) => {
            console.log(payload);
            return axios.post("http://localhost:8080/register/login", payload);
        },
        onSuccess: (response) => {
            const userData = response.data;

            if (userData) {
                console.log("User Data:", userData);

                try {
                    localStorage.setItem("userDetails", JSON.stringify(userData));
                    handleLoginSuccess();
                    const data: any = JSON.parse(localStorage.getItem("userDetails"));
                    console.log(data);
                    console.log(typeof data);
                    setUser(data);
                    reset();

                    if (userData.roles === "ADMIN") {
                        // Redirect to admin page or perform admin-related actions
                        navigate('/AdminDashboard'); // Assuming you have a route for the admin page
                    }
                } catch (error) {
                    console.error("Error storing user details in local storage:", error);
                }
            } else {
                console.error("User details not found in the response");
            }
        },
    });


    const handleLoginSuccess = () => {
        setLoginSuccess(true);
    };


    useEffect(() => {
        // Close login popup when login success state is true
        if (loginSuccess) {
            toggleLoginModal();
            setLoginSuccess(false);  // Reset login success state
        }
    }, [loginSuccess, toggleLoginModal]);

    const onSubmit=(value:any)=>{
        useApiCall.mutate(value)
    }

    const onSubmitLogin = (values: any) => {
        useApiCallLogin.mutate(values);
    };

    const   handleLogout = () => {
        // Check if a user is currently logged in
        const isLoggedIn = Boolean(localStorage.getItem('userDetails'));

        if (isLoggedIn) {
            // Clear user details from localStorage
            localStorage.removeItem('userDetails');

            // Update the state to reflect logout
            setUser(null);

            navigate('/');
        }
    };

    const difftoast =() => {
        toast.success("wow! you just register", {position: "top-center"})
    }


    return(
        <>
            <div className={"nav-bar"}>
                <div className={"logo"}>
                    <img src={"src/images/logo.png"} width={"215px"}  />
                </div>
                <div className={"home-options"}>
                    <ul>
                        {/*<Link to={"/"}><li className={activePage === "/" ? "active" : ""}><a>Home</a></li></Link>*/}
                        {/*<Link to={"/Home"}><li className={activePage === "/Home" ? "active" : ""}><a>Home</a></li></Link>*/}
                        {/*<Link to={"/ReservationPage"}><li className={activePage === "/ReservationPage" ? "active" : ""}><a>ReservationPage</a></li></Link>*/}
                        {/*<Link to={"/EventsPage"}><li className={activePage === "/EventsPage" ? "active" : ""}><a>Events</a></li></Link>*/}
                        {/*<Link to={"/ContactPage"}><li className={activePage === "/ContactPage" ? "active" : ""}><a>Contact</a></li></Link>*/}
                    </ul>
                </div>

                <div className={"hp-navright"}>
                    <Link to={"/Home"}>
                        <span className={"icon-cart"}>
                               Home
                        </span>
                    </Link>


                    <Link to={"/cart"}>
                        <span className={"icon-cart"}>
                                <FaCartArrowDown style={{ fontSize: "1.2rem", marginBottom: "-6px", marginRight: "10px" }} />
                        </span>
                    </Link>

                    {user ? (
                             <span className={"fullnamedisplay"} onClick={() => setUserProfile(true)}>
                                <FaCircleUser style={{ fontSize: "3rem", marginBottom: "-3px", marginRight: "3px" }} />
                             </span>
                    ):
                        (
                        !localStorage.getItem("userDetails") && (
                            <div className={"hp-sign-btn"}>
                                <h3 onClick={toggleLoginModal}>Sign in</h3>
                            </div>
                        )
                    )}
                </div>

                {/*<div className={"nav-mobile"} onClick={()=> setNavMenuOpen(!navMenuOpen)}>*/}
                {/*    <span style={{fontSize:"1.7rem"}}><RxHamburgerMenu /></span>*/}
                {/*</div>*/}

            </div>


            {login_popup && (
                <div className="login-modal">
                    <div onClick={toggleLoginModal} className="login-overlay"></div>
                    <div className="login-modal-content">
                        <h2>Login</h2>
                        <button className="close-login-btn" onClick={toggleLoginModal}>
                            <FaRegWindowClose />
                        </button>
                        <form onSubmit={handleSubmit(onSubmitLogin)}>
                            <div className={"input-box"}>
                                <span className={"iconmail"}> <FaUser /></span>
                                <div className={"username"}>
                                    <input
                                        type={"email"}
                                        placeholder={"Email"}
                                        {...register("email")}
                                    />
                                </div>
                                <span className={"iconpassword"}><RiLockPasswordFill /></span>
                                <div className={"password"}>
                                    <input
                                        type={"password"}
                                        placeholder={"Password"}
                                        {...register("password")}
                                    />
                                </div>
                            </div>
                            <div className={"Remember-forget"}>
                                <label><input type={"checkbox"}/>Remember me</label>
                                <Link to={"/f1"}><a href={"#"} >Forget passsword</a></Link>
                            </div>
                            <button type={"submit"} className={"btn-login10"} >Login</button>
                            <div className={"register-text"}>
                                <p> Don't have an account?
                                    <a href={"#"} onClick={toggleRegisterModal}>Register</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {register_popup && (
                <div className="register-modal">
                    <div onClick={toggleRegisterModal} className="register-overlay"></div>
                    <div className="register-modal-content">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2>Register</h2>
                            <button className="close-register-btn" onClick={toggleRegisterModal}>
                                <FaRegWindowClose />
                            </button>

                            <div className={"reg-input-box"}>
                                {/*<span className={"iconname"}> <FaUser /></span>*/}
                                <div className={"username"}>
                                    <input type={"text"} placeholder={"Name"} {...register("fullName",{
                                        required:"FullName is required!!"
                                    })}
                                    />
                                    {errors.fullName && (
                                        <p className="error-message">{errors?.fullName?.message}
                                        </p>
                                    )}
                                </div>
                                <div className={"username"}>
                                    <input type={"email"} placeholder={"Email"}  {...register("email",
                                        {required:"Email is required!!"})}/>
                                    {errors.email && (
                                        <p className="error-message">{errors?.email?.message}
                                        </p>
                                    )}
                                </div>
                                <span className={"iconuser"}><FaUser /> </span>
                                {/*<span className={"iconpassword"}><RiLockPasswordFill /></span>*/}
                                <div className={"password"}>
                                    <input type={"password"} placeholder={"Password"}   {...register("password",
                                        {required:"Password is required!!"})}/>

                                    {errors.password && (
                                        <p className="error-message">{errors?.password?.message}
                                        </p>
                                    )}

                                </div>
                                {/*<span className={"iconpassword"}><RiLockPasswordFill /></span>*/}
                                <div className={"password"}>

                                    <input type={"password"} placeholder={"Confirm Password"}
                                           {...register("confirmPassword", {


                                               required: "Confirm Password is required",
                                               validate: {
                                                   matchesPassword: (value) =>
                                                       value === watch("password") || "Confirm Password does not match Password",
                                               },
                                           })}
                                    />

                                    {errors.confirmPassword && (
                                        <p className="error-message">{errors?.confirmPassword?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={"security-question"}>
                                <div className={"header10"}>Security Question</div>
                                <div className={"answer"}>
                                    <input type={"answer"} placeholder={"Your first school name?"}  {...register("securityQuestion",
                                        {required:"SecurityQuestion is required!!"})}/>
                                    {errors.securityQuestion && (
                                        <p className="error-message">{errors?.securityQuestion?.message}
                                        </p>
                                    )}
                                </div>

                            </div>
                            <button type={"submit"} className={"btn-signup10"}
                                // onClick={difftoast}
                            >Sign Up</button>
                            <ToastContainer/>
                        </form>
                    </div>
                </div>
            )}

            {userProfile && <UserProfileView />}



        </>
    )
}

export default HomeNavbar