import React, { Fragment, useState } from 'react'
import IconRight from '../Assets/Images/Vector.png'
import IconLeft from '../Assets/Images/VectorLeft.png'
import { Button } from '@mui/material'
import Logo from '../Assets/Images/Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import secureLocalStorage from 'react-secure-storage'
import { toast } from 'react-toastify'

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        const storedUsers = JSON.parse(secureLocalStorage.getItem('usersTinyMoviez')) || [];
        if (storedUsers.find(user => user.email === email)) {
            toast.error('Email already exists');
            return;
        }
        const newUsers = [...storedUsers, { email }];
        secureLocalStorage.setItem('usersTinyMoviez', JSON.stringify(newUsers));
        toast.success('Signup successful');
        navigate('/login');
    };
    return (
        <Fragment>
            <div className="login-container">
                <img src={IconRight} alt={IconRight} />
                <img src={IconLeft} alt={IconLeft} />

                <form onSubmit={handleSignup}>
                    <div>
                        <img src={Logo} alt={Logo} />
                    </div>
                    <div onClick={() => navigate(-1)}>
                        <IoIosArrowRoundBack />
                        <p>Go Back</p>
                    </div>
                    <label htmlFor="email">Email</label><br />
                    <input type="text" name="email" id="email" value={email} placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
                    <p>Already Have an Account ? <Link to={`/login`}>Login</Link></p>
                    <Button type='submit'>SIGNUP</Button>
                </form>
            </div>
        </Fragment>
    )
}

export default Signup
