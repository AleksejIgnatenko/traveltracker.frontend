import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconBase } from "../atoms/IconBase";
import '../../styles/organisms/Sidebar.css';
import 'boxicons/css/boxicons.min.css';

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        const fetchData = async () => {
            
        };

        fetchData();
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
    }, [currentTheme]);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const toggleTheme = () => {
        setCurrentTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <>
            <div className={`sidebar ${showSidebar ? '' : 'close'}`}>
                <div className="logo-details">
                    <IconBase name="bx-menu" className="menu-icon" onClick={toggleSidebar} />
                    <span className="logo_name">DashBoard</span>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">
                            <IconBase name="bx-home" className="nav-icon" />
                            <span className="link_name">Главная</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link to="/" className="link_name">Главная</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/employees">
                            <IconBase name="bx-user" className="nav-icon" />
                            <span className="link_name">Сотрудники</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link className="link_name" to="/employees">Сотрудники</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/offices">
                            <IconBase name="bx-buildings" className="nav-icon" />
                            <span className="link_name">Офисы</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link className="link_name" to="/offices">Офисы</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/specialization">
                            <IconBase name="bx-collection" className="nav-icon" />
                            <span className="link_name">Специализации</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link className="link_name" to="/specialization">Специализации</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link onClick={toggleTheme}>
                            <IconBase 
                                name={currentTheme === 'light' ? 'bx-moon' : 'bx-sun sun'} 
                                className="nav-icon"
                            />
                            <span className="link_name">Переключить тему</span>
                        </Link>
                        <ul className="sub-menu blank">
                            <li><Link className="link_name" onClick={toggleTheme}>Переключить тему</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    );
};