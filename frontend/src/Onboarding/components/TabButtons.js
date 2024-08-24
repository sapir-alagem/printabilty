import React from 'react';
import '../pages/OnboardingForm.css'
const TabButtons = ({ activeTab, showTab }) => {
    return (
        <div className="tab-btns">
            <button className={activeTab === 0 ? 'tab-btn active' : 'tab-btn'} onClick={() => showTab(0)}>Personal Info</button>
            <button className={activeTab === 1 ? 'tab-btn active' : 'tab-btn'} onClick={() => showTab(1)}>Pricing Configuration</button>
            <button className={activeTab === 2 ? 'tab-btn active' : 'tab-btn'} onClick={() => showTab(2)}>Summary</button>
        </div>
    );
};

export default TabButtons;
