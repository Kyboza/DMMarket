import React from "react";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

const NewPassword = () => {
  const { state } = useLocation();
  const { email } = state || {};

  const navigate = useNavigate();

  const newPassword = useStoreState((state) => state.formFields.newPassword);
  const setNewPassword = useStoreActions(
    (actions) => actions.formFields.setNewPassword
  );
  const confirmNewPassword = useStoreState(
    (state) => state.formFields.confirmNewPassword
  );
  const setConfirmNewPassword = useStoreActions(
    (actions) => actions.formFields.setConfirmNewPassword
  );

  const showPassword = useStoreState((state) => state.formFields.showPassword);
  const setShowPassword = useStoreActions(
    (actions) => actions.formFields.setShowPassword
  );

  const showConfirmPassword = useStoreState(
    (state) => state.formFields.showConfirmPassword
  );
  const setConfirmShowPassword = useStoreActions(
    (actions) => actions.formFields.setConfirmShowPassword
  );

  const sendNewPassword = useStoreActions(
    (actions) => actions.transferInfo.sendNewPassword
  );
  const resetForm = useStoreActions(
    (actions) => actions.formFields.resetFields
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const sendPasswordRequest = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        title: "Failed Updating Password",
        text: "The two passwords do not match",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#14BFEEBF",
      });
      resetForm();
      return;
    }

    if (!newPassword || !confirmNewPassword) {
      Swal.fire({
        title: "Failed Updating Password",
        text: "Please enter a new password and confirm it",
        icon: "error",
        showConfirmButton: false,
        confirmButtonColor: "#14BFEEBF",
      });
      resetForm();
      return;
    }

    try {
      const response = await sendNewPassword({
        email,
        newPassword,
        confirmNewPassword,
      });

      if (response.status === 200) {
        await Swal.fire({
          title: "Password Updated!",
          icon: "success",
          timer: 1500,
          confirmButtonText: "Ok",
          confirmButtonColor: "#14BFEEBF",
        });
        resetForm();
        navigate("/DMMarket/");
      } else {
        Swal.fire({
          title: "Failed to update password",
          text: "Please try again later.",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#14BFEEBF",
        });
        resetForm();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message ===
          "Reset window has expired, request a new verification code"
      ) {
        Swal.fire({
          title: "Verification Code Expired",
          text: "The verification code might have expired. Please request a new one.",
          icon: "warning",
          confirmButtonText: "Ok",
          confirmButtonColor: "#14BFEEBF",
        });
        resetForm();
      } else {
        console.error("Error:", error);
        Swal.fire({
          title: "Something went wrong",
          text: "Unable to update your password. Please try again.",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#14BFEEBF",
        });
        resetForm();
      }
    }
  };

  return (
    <main className="Reset__container">
      <p className="Reset__title">Choose A New Password</p>
      <form className="Reset__form_container" onSubmit={sendPasswordRequest}>
        <div className="Newpass__section_container">
          <div className="Newpass__input_container">
            <label htmlFor="newpassword" className="offscreen">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="newpassword"
              name="newpassword"
              placeholder="New Password"
              className="Login__input"
              required
              autoComplete="off"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          <div className="Newpass__input_container">
            <label htmlFor="confirmnewpassword" className="offscreen">
              Confirm New Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmnewpassword"
              name="confirmnewpassword"
              placeholder="Confirm New Password"
              className="Login__input"
              required
              autoComplete="off"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className="Login__eye_icon"
                onClick={toggleConfirmPasswordVisibility}
              />
            ) : (
              <FaEye
                className="Login__eye_icon"
                onClick={toggleConfirmPasswordVisibility}
              />
            )}
          </div>
        </div>

        <div className="Login__button_container">
          <button type="submit" className="Login__button">
            Update Password
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewPassword;
