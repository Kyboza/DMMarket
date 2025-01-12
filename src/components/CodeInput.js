import React, { useRef } from "react";
import Swal from "sweetalert2";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";

const CodeInput = () => {
  const email = useStoreState((state) => state.formFields.email);
  const sendVerificationCode = useStoreActions(
    (actions) => actions.transferInfo.sendVerificationCode
  );
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    if (e.target.value.length > 0 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const fullVerification = async (e) => {
    e.preventDefault();
    const code = inputsRef.current.map((input) => input.value).join("");

    if (code.length !== 4) {
      return Swal.fire({
        title: "Incomplete Code",
        text: "Please enter the full 4-digit verification code.",
        icon: "warning",
        confirmButtonText: "Got It",
        confirmButtonColor: "#14BFEEBF",
      });
    }

    const verificationPayload = { email, code };

    try {
      await sendVerificationCode(verificationPayload);
      await Swal.fire({
        title: "Verification Successful",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/newpassword", { state: { email } });
    } catch (error) {
      Swal.fire({
        title: error.message || "Network or Server Error",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#14BFEEBF",
      });
    }
  };

  return (
    <main className="Reset__container">
      <p className="Reset__title">Enter Verification Code</p>
      <form
        className="Verification__form_container"
        onSubmit={fullVerification}
      >
        <label htmlFor="enterverification" className="offscreen">
          Enter Verification Code
        </label>
        <div className="Verification__inner_container">
          {[0, 1, 2, 3].map((_, index) => (
            <input
              key={index}
              type="text"
              className="Verification__input"
              inputMode="numeric"
              maxLength="1"
              required
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <div className="Login__button_container">
          <button className="Login__button" type="submit">
            Confirm
          </button>
        </div>
      </form>
    </main>
  );
};

export default CodeInput;
