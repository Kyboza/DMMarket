import React from "react";
import Swal from "sweetalert2";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const email = useStoreState((state) => state.formFields.email);
  const setEmail = useStoreActions((actions) => actions.formFields.setEmail);
  const sendResetEmail = useStoreActions(
    (actions) => actions.transferInfo.sendResetEmail
  );

  const navigate = useNavigate();

  const sendReset = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Sending Reset Email...",
        icon: "info",
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await sendResetEmail({ email });

      await Swal.fire({
        title: "Code Sent!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      Swal.close();

      navigate("/enterverification");
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: "Error",
        text: "Something went wrong while sending the email. Please try again.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#14BFEEBF",
      });
      console.log(error.message);
    }
  };

  return (
    <main className="Reset__container">
      <p className="Reset__title">Reset Link</p>
      <form className="Reset__form_container" onSubmit={sendReset}>
        <label htmlFor="resetemail" className="offscreen">
          Reset Email
        </label>
        <input
          type="email"
          id="resetemail"
          name="resetemail"
          className="Reset__input"
          placeholder="Select E-Mail"
          required
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="Login__button_container">
          <button className="Login__button" type="submit">
            Send Reset
          </button>
        </div>
      </form>
    </main>
  );
};

export default Reset;
