import { useState, useEffect } from "react";
import "../css/ourMenu.css";
import MenuCard from "./menuPage/menuCard.tsx";
import Navbar from "./menuPage/menuNavbar.tsx";
import HomeNavbar from "./Navbar&Modals/HomeNavbar.tsx";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface MenuItem {
    category: {
        name: string;
    };
    name: string;
}

const Home: React.FC = () => {
    const location = useLocation();
    const currentLocation = location.pathname;

    const { data: Menu2 } = useQuery({
        queryKey: ["GET_ITEM_DATA"],
        queryFn() {
            return axios.get<MenuItem[]>("http://localhost:8080/item/findAll");
        },
    });

    const [menuData, setMenuData] = useState<MenuItem[]>([]);
    const [menuList, setMenuList] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([]);

    useEffect(() => {
        if (Menu2?.data) {
            setMenuData(Menu2.data);

            const uniqueCategories = [
                ...new Set(
                    Menu2.data.map((curElem) => curElem?.category?.name || "Uncategorized")
                ),
                "All",
            ];
            setMenuList(uniqueCategories);
        }
    }, [Menu2?.data]);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredMenu(menuData);
        } else {
            const filtered = menuData.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredMenu(filtered);
        }
    }, [searchQuery, menuData]);

    const filterItem = (category: string) => {
        if (category === "All") {
            setFilteredMenu(menuData);
        } else {
            const updatedList = menuData.filter((curElem) => {
                return curElem?.category?.name === category;
            });
            setFilteredMenu(updatedList);
        }
    };

    return (
        <>
            <div className={"menu-page-div"}>
                <HomeNavbar activePage={currentLocation} />
                <div className={"check-out-container"}>
                    <h1>CuppaCanva</h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={"menu-contents"}>
                    <Navbar filterItem={filterItem} menuList={menuList} />
                    <MenuCard menuData={filteredMenu} />
                </div>
            </div>
        </>
    );
};

export default Home;
