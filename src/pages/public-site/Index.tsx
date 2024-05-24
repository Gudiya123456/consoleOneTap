import React, { useState } from 'react'
import Banner from './Banner';
import Demorequest from './Demorequest';
import Integrations from './Integration';
import Notification from './Notification';
import Settings from './Settings';

export default function index() {


    const [activeTab, setActiveTab] = useState('settings');
    return (
        <div className='flex'>

            <div className='min-w-[180px] w-[280px] p-5'>

                <button className='btn btn-dark  w-full mb-2' onClick={() => setActiveTab('settings')}>General Settings</button>
                <button className='btn btn-dark  w-full mb-2' onClick={() => setActiveTab('banner')}>Banner</button>

                <button className='btn btn-dark  w-full mb-2' onClick={() => setActiveTab('integrations')}>Integrations</button>
                <button className='btn btn-dark  w-full mb-2' onClick={() => setActiveTab('demo')}>Demo Request</button>

                <button className='btn btn-dark  w-full mb-2' onClick={() => setActiveTab('notification')}>Notifications</button>

            </div>


            <div className='w-full p-5'>

                {activeTab == 'settings' ? <Settings /> :
                    activeTab == 'banner' ? <Banner /> :
                        activeTab == "demo" ? <Demorequest /> :
                            activeTab == "integrations" ? <Integrations /> :
                                activeTab == 'notification' ? <Notification /> :
                                    ''}
            </div>
        </div>
    )
}
