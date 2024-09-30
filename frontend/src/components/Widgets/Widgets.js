import React from 'react';
import TrendingTopics from '../TrendingTopics/TrendingTopics';
import Birthdays from '../Birthdays/Birthdays';
import Weather from '../Weather/Weather';
import QuickPost from '../QuickPost/QuickPost';
import './Widgets.css';

const Widgets = () => {
    return (
        <div className="widgets">
            <TrendingTopics />
            <Birthdays />
            <Weather />
            <QuickPost />
        </div>
    );
};

export default Widgets;