import React from 'react';
import './Sidebar.css'; // Optional: Add custom styles for the sidebar

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/createCrew">Create Crew</a></li>
                <li><a href="/showCrew">Show Crew</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;