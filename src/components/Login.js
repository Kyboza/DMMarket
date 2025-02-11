import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const user = useStoreState((state) => state.formFields.username);
  const pwd = useStoreState((state) => state.formFields.password);

  const setUsername = useStoreActions(
    (actions) => actions.formFields.setUsername
  );
  const setPassword = useStoreActions(
    (actions) => actions.formFields.setPassword
  );

  const resetFields = useStoreActions(
    (actions) => actions.formFields.resetFields
  );
  const loginUser = useStoreActions(
    (actions) => actions.transferInfo.loginUser
  );

  const showPassword = useStoreState((state) => state.formFields.showPassword);
  const setShowPassword = useStoreActions(
    (actions) => actions.formFields.setShowPassword
  );

  const setLoggedIn = useStoreActions(
    (actions) => actions.transferInfo.setLoggedIn
  );

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await loginUser({ user: user, pwd: pwd });
  
      if (response?.accessToken) {
        await Swal.fire({
          title: "Log In Successful",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoggedIn(true);
        navigate("/"); 
        resetFields();
      } else {
        await Swal.fire({
          title: "Error logging in",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error.message);
      await Swal.fire({
        title: "Something went wrong",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="Login__container">
      <div className="Login__title_container">
        <p className="Login__title">Login</p>
        <FaUser className="Login__user_icon" />
      </div>
      <form className="Login__form_container" onSubmit={handleLogin}>
        <legend className="offscreen">Login</legend>
        <div className="Login__section_container">
          <input
            type="text"
            id="logusername"
            placeholder="Username"
            className="Login__input"
            required
            autoComplete="off"
            value={user}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="Login__hidden" />
        </div>

        <div className="Login__section_container">
          <input
            type={showPassword ? "text" : "password"}
            id="logpassword"
            placeholder="Password"
            className="Login__input"
            required
            autoComplete="off"
            value={pwd}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEyeSlash
              className="Login__eye_icon"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <FaEye
              className="Login__eye_icon"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>

        <div className="Login__button_container">
          <button className="Login__button" type="submit">
            Login
          </button>
        </div>

        <div className="Login__info_container">
          <Link to="/reset" className="Link__settings">
            <p className="Login__info_txt">Forgot Password?</p>
          </Link>
          <Link to="/register" className="Link__settings">
            <p className="Login__info_txt">Register An Account.</p>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
