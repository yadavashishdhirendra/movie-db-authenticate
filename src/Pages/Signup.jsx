import React, { Fragment, useState } from "react";
import IconRight from "../Assets/Images/Vector.png";
// import IconLeft from '../Assets/Images/VectorLeft.png'
import { Button } from "@mui/material";
import Logo from "../Assets/Images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import MetaTitle from "../Components/Meta.name";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email Id is required.");
      return;
    }
    const storedUsers =
      JSON.parse(secureLocalStorage.getItem("usersTinyMoviez")) || [];
    if (storedUsers.find((user) => user.email === email)) {
      toast.error("Email already exists");
      return;
    }
    const newUsers = [...storedUsers, { email: email, name: name }];
    secureLocalStorage.setItem("usersTinyMoviez", JSON.stringify(newUsers));
    toast.success("Signup successful");
    navigate("/login");
  };
  return (
    <Fragment>
      <MetaTitle title={`Tiny Moviez - Signup`} />
      <div className="login-container">
        <img src={IconRight} alt={IconRight} />
        {/* <img src={IconLeft} alt={IconLeft} /> */}

        <form onSubmit={handleSignup}>
          <div>
            <img src={Logo} alt={Logo} />
          </div>
          <div onClick={() => navigate(-1)}>
            <FaArrowLeftLong />
            <p>Go Back</p>
          </div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>
            Already Have an Account ? <Link to={`/login`}>Login</Link>
          </p>
          <Button type="submit">SIGNUP</Button>
        </form>
      </div>
    </Fragment>
  );
};

export default Signup;
