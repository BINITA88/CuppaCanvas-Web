import "../css/ManageItem.css"
import React, { useEffect, useState } from "react";
import {FaPlus, FaRegWindowClose, FaSearch} from "react-icons/fa";
import gsap from "gsap";
import AdminSidebar from "./adminSidebar.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {CiEdit} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import {useForm} from "react-hook-form";


const ManageItem: React.FC = () => {

    const[search,setSearch] = useState('');
    const navigate = useNavigate();

    // Add Items modal
    const [modal, setModal] = useState(false);

    const toggleItemModal = () => {
        if (modal) {
            reset(); // Reset the form
        }
        setModal(!modal); // Toggle the modal
    };

    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    // GSAP cdn for animation
    useEffect(() => {
        if (modal) {
            gsap.from(".add-item-modal", {
                y: -50,
                duration: 0.3,
                opacity: 0,
            });
        }
    }, [modal]);

    const location = useLocation(); // Use useLocation to get the current location
    const currentLocation = location.pathname;


    //hitting server on port 8080
    const{register,
        handleSubmit,
        formState
        ,reset}=useForm();

    const{errors} = formState;

    const useApiCall = useMutation({
        mutationKey:["POST_ITEM_DATA"],
        mutationFn:(payload:any)=>{
            console.log(payload)
            return axios.post("http://localhost:8080/item/save",payload)
        },onSuccess: () => {
            // notify();
            reset();
            refetch();
        }
    })

    const onSubmit=(value:any)=>{
        console.log(value);
        const fd= new FormData();
        fd.append("itemName",value?.itemName)
        fd.append("itemPrice",value?.itemPrice)
        fd.append("categoryId",value?.categoryId)
        fd.append("itemImage",value?.itemImage[0])
        useApiCall.mutate(fd)
    }


    // Fetching data from API
    const{data,refetch} = useQuery({
        queryKey:["GET_ITEM_DATA"],
        queryFn(){
            return axios.get("http://localhost:8080/item/findAll")
        }
    })

    //Searching data
    const filteredItemData = data?.data.filter((item) =>
        item.itemName.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toString().includes(search.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(search.toLowerCase())
    );

    console.log(filteredItemData)

    const { data: categories } = useQuery({
        queryKey: ["GET_CATEGORIES"],
        queryFn() {
            return axios.get("http://localhost:8080/category/findAll"); // Replace with your actual API endpoint
        },
    });

    //Deleting data
    const deleteByIdApi=useMutation(
        {
            mutationKey:["DELETE_ITEM_BY_ID"],
            mutationFn(id:number){
                return axios.delete("http://localhost:8080/item/delete/"+id);
            },onSuccess(){refetch()}
        }
    )

    console.log(filteredItemData)

    return(
        <div>
            <div className={"add-item-page"}>
                <div className={"itempage-left"} >
                    <AdminSidebar activePage={currentLocation} />
                </div>

                <div className={"itempage-right"}>
                    <header className={"itempage-header"}>
                        <h1>Manage Item</h1>

                        <div className={"search-wrapper"}>
                            <span><FaSearch /></span>
                            <input type={"search"} placeholder={"Search Item"} value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        </div>

                        <div className={"user-wrapper"}>
                            <img src={"https://images.pexels.com/photos/14073969/pexels-photo-14073969.jpeg?auto=compress&cs=tinysrgb&w=800"} width={"40px"} height={"40px"} alt={"N"}/>
                            <div>
                                <h4>Admin</h4>
                                <small>Super admin</small>
                            </div>
                        </div>
                    </header>

                    <div className={"item-main-content"}>
                        <div className={"i-main-content"}>
                            <div className={"btn3"}>
                                <button type={"button"} onClick={toggleItemModal}><span><FaPlus style={{fontSize:"1.5rem",marginBottom:"-1px",color:"white"}}/></span></button>
                            </div>

                            <div className={"table-container3"}>
                                <div className={"card-header3"}>
                                    <h2>Items</h2>
                                </div>
                                <div className={"card-body3"}>
                                    <table className={"table-bordered3"}>
                                        <thead>
                                        <tr>
                                            <th className={"id-box3"}>Id</th>
                                            <th className={"name-box3"}>Name</th>
                                            <th className={"category-box3"}>Category</th>
                                            <th className={"image-box3"}>Image</th>
                                            <th className={"price-box3"}>Price</th>
                                            <th className={"action-box3"}>Action</th>
                                            {/*<th className={"status-box3"}>Status</th>*/}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            filteredItemData
                                                ?.sort((a, b) => a.id - b.id)
                                                .map((i) =>{
                                                    return(
                                                        <tr key={i?.id}>
                                                            <td>{i?.id}</td>
                                                            <td>{i?.itemName}</td>
                                                            <td>{i?.category?.name}</td>
                                                            <td style={{display:"flex",justifyContent:"center"}}>
                                                                <img src={'data:image/jpeg;base64,'+i?.itemImage} width={"45px"}/>
                                                            </td>
                                                            <td>{i?.itemPrice}</td>
                                                            <td>
                                                                <button className={"edit-btn3"} onClick={()=>{
                                                                    navigate("/editItem/"+i?.id);
                                                                    // console.log(i?.id)
                                                                    }}><CiEdit />
                                                                </button>
                                                                <button className={"delete-btn3"} onClick={() => {
                                                                    if (window.confirm("Are you sure you want to delete this category?")) {
                                                                        deleteByIdApi.mutate(i?.id);
                                                                    }
                                                                    }}><MdDelete />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {modal && (
                <div className="add-item-modal">
                    <div onClick={toggleItemModal} className="add-item-overlay"></div>
                    <div className="add-item-modal-content">
                        <h2>Add Item</h2>
                        <button className="close-add-item-btn" onClick={toggleItemModal}>
                            <FaRegWindowClose />
                        </button>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={"select-category"}>
                                <label>Category</label>
                                <select id={"category-option"} placeholder={""} {...register("categoryId", { required: true })}>
                                    <option>Select a Category</option>
                                    {categories &&
                                        categories.data.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className={"item-name"}>
                                <label>Item Name</label>
                                <input type={"text"} placeholder={"Enter item Name"} {...register("itemName",{required:"Item Name is required!!"})}/>
                                <h6 style={{paddingLeft:"3px"}}>{errors?.itemName?.message}</h6>
                            </div>
                            <div className={"item-price"}>
                                <label>Price</label>
                                <input type={"number"} placeholder={"Enter the Price"} {...register("itemPrice",{required:"Price is required!!"})}/>
                                <h6 style={{paddingLeft:"3px"}}>{errors?.itemPrice?.message}</h6>
                            </div>
                            <div className={"item-image"}>
                                <label>Image</label>
                                <span>
                                    <input type={"file"} placeholder={"Add image here"} {...register("itemImage",{required:"Item Image is required!!"})}/>
                                     <h6 style={{paddingLeft:"3px"}}>{errors?.itemImage?.message}</h6>
                                </span>
                            </div>

                            <div className={"item-name-add-btn"}>
                                <button type={"submit"}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageItem