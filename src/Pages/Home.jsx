import React, { Fragment } from 'react'
import { default as SideBar } from '../Components/Sidebar.common'
import secureLocalStorage from 'react-secure-storage';
import { IoBookmark } from "react-icons/io5";

const Home = () => {
    let user = JSON.parse(secureLocalStorage.getItem('user_watch_list'));
    console.log(user)
    return (
        <Fragment>
            <div className="container">
                <div className='wrapper-container-grid-row'>
                    <div>
                        <SideBar />
                    </div>
                    <div>
                        <h3>Welcome, {user.email.slice(0, 12)}</h3>

                        <div className="watch-list-container">
                            <h1>Welcome to, <span>Tiny Moviez</span></h1>
                            <p>Browse movies, add them to watchlists and share them with friends.</p>
                            <p>Just click the <IoBookmark color='#E76F51' /> to add a movie, the poster to see more details marked the video as watched.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home
