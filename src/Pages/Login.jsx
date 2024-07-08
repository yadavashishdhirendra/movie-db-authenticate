import React, { Fragment, useEffect, useState } from "react";
import IconRight from "../Assets/Images/Vector.png";
// import IconLeft from "../Assets/Images/VectorLeft.png";
import { Button } from "@mui/material";
import Logo from "../Assets/Images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import MetaTitle from "../Components/Meta.name";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(
      secureLocalStorage.getItem("usersTinyMoviez")
    );
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.email === email);
    if (user) {
      secureLocalStorage.setItem("user_watch_list", JSON.stringify(user));
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error("Email Doesn't Exists");
    }
  };

  useEffect(() => {
    if (secureLocalStorage.getItem("user_watch_list")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Fragment>
      <MetaTitle title={`Tiny Moviez - Login`} />
      <div className="login-container">
        <img src={IconRight} alt={IconRight} />
        {/* <img src={IconLeft} alt={IconLeft} /> */}

        <form onSubmit={handleLogin}>
          <div>
            <img src={Logo} alt={Logo} />
          </div>
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
            Don't Have an Account ? <Link to={`/signup`}>Create Account</Link>
          </p>
          <Button type="submit">LOGIN</Button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
