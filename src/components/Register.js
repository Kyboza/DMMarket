import React from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { FaUser, FaEye } from "react-icons/fa";
import { useStoreActions, useStoreState } from "easy-peasy";

const Register = () => {
  const user = useStoreState((state) => state.formFields.username);
  const pwd = useStoreState((state) => state.formFields.password);
  const email = useStoreState((state) => state.formFields.email);
  const navigate = useNavigate()

  const setUsername = useStoreActions(
    (actions) => actions.formFields.setUsername
  );
  const setPassword = useStoreActions(
    (actions) => actions.formFields.setPassword
  );
  const setEmail = useStoreActions((actions) => actions.formFields.setEmail);

  const registerUser = useStoreActions(
    (actions) => actions.transferInfo.registerUser
  );
  const resetFields = useStoreActions(
    (actions) => actions.formFields.resetFields
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await registerUser({ user, email, pwd });
    
      Swal.fire({
        title: 'Success!',
        text: 'You have registered successfully!',
        icon: 'success',
        timer: 2000,
        confirmButtonText: "Ok",
        confirmButtonColor: "#14BFEEBF",
      });
      resetFields();
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'There was an issue with your registration. Please try again.';
      
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: "Ok",
        confirmButtonColor: "#14BFEEBF",
      });
    }
    
  };

  return (
    <main className="Login__container">
      <div className="Login__title_container">
        <p className="Login__title">Register</p>
        <FaUser className="Login__user_icon" />
      </div>
      <form className="Login__form_container" onSubmit={handleSubmit}>
        <legend className="offscreen">Register</legend>
        <div className="Login__section_container">
          <input
            type="text"
            id="regusername"
            name="username"
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
            type="email"
            id="regemail"
            name="email"
            placeholder="E-Mail"
            className="Login__input"
            required
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className="Login__hidden" />
        </div>

        <div className="Login__section_container">
          <input
            type="password"
            id="regpassword"
            name="password"
            placeholder="Password"
            className="Login__input"
            required
            autoComplete="off"
            value={pwd}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaEye className="Login__eye_icon" />
        </div>

        <div className="Login__button_container">
          <button className="Login__button" type="submit">
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default Register;
