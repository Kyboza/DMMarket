import React, { useEffect, useRef } from "react";
import MainLogo from "../images/logos/Dmmarketlogo1024x1024.png";
import useWindowSize from "../hooks/useWindowSize";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const inputDropdown = useRef(null);
  const inputLogout = useRef(null);

  const isActive = useStoreState((state) => state.homeDropDown.isActive);
  const toggleActive = useStoreActions(
    (actions) => actions.homeDropDown.toggleActive
  );

  const search = useStoreState((state) => state.searchEngine.search);
  const setSearch = useStoreActions(
    (actions) => actions.searchEngine.setSearch
  );
  const matchingCards = useStoreState(
    (state) => state.searchEngine.matchingCards
  );

  const loggedIn = useStoreState((state) => state.transferInfo.loggedIn);
  const setLoggedIn = useStoreActions(
    (actions) => actions.transferInfo.setLoggedIn
  );

  const isLogout = useStoreState((state) => state.transferInfo.isLogout);
  const toggleLogout = useStoreActions(
    (actions) => actions.transferInfo.toggleLogout
  );

  const logoutUser = useStoreActions(
    (actions) => actions.transferInfo.logoutUser
  );

  const cartItems = useStoreState((state) => state.cart.items);
  const totalCartAmount = cartItems.reduce(
    (total, item) => total + item.amount,
    0
  );
  const showAmount = totalCartAmount > 0;

  const { width } = useWindowSize();
  const showNav = width >= 768;

  useEffect(() => {
    const checkLogIn = localStorage.getItem("loggedInValue") === "true";
    setLoggedIn(checkLogIn);
  }, [setLoggedIn]);

  const clickSearch = () => {
    setSearch("");
  };

  const loggingOut = async (e) => {
    e.preventDefault();
    try {
      const response = await logoutUser();
      if (response?.status === 204) {
        await Swal.fire({
          title: "Log Out Successful",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoggedIn(false);
        navigate("/DMMarket/");
      } else {
        Swal.fire({
          title: "Error During Logout",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        throw new Error("Could not log out");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSearch("");
      }

      if (
        isActive &&
        inputDropdown.current &&
        !inputDropdown.current.contains(event.target)
      ) {
        toggleActive();
      }

      if (
        isLogout &&
        inputLogout.current &&
        !inputLogout.current.contains(event.target)
      ) {
        toggleLogout();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setSearch, toggleActive, isActive, isLogout, toggleLogout]);

  return (
    <header className="Header__container">
      <div className="Header__logo_container">
        <Link to="/DMMarket/" className="Link__settings">
          <img
            src={MainLogo}
            alt="logo"
            className="Header__logo"
            height="1024"
            width="1024"
          />
        </Link>
      </div>

      <div className="Header__title_container">
        <Link to="/DMMarket/" className="Link__settings">
          <h2 className="Header__title">DM Market</h2>
        </Link>
        <p className="Header__desc">The Largest OCG Card Shop</p>
      </div>

      {showNav && (
        <div className="Nav__search_container">
          <form action="search" className="Nav__search_form">
            <div className="Nav__search_input_container">
              <FaSearch className="Nav__search_icon" />
              <label htmlFor="searchBar" className="offscreen">
                Search
              </label>
              <input
                type="text"
                placeholder="Card Number, Name"
                id="searchBar"
                autoComplete="off"
                className="Nav__search_input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ref={inputRef}
              />
            </div>
            <ul className="Nav__search_ul">
              {matchingCards.slice(0, 6).map((card) => (
                <li
                  key={card.id}
                  className="Nav__search_li"
                  onClick={clickSearch}
                >
                  <Link
                    to={`/card/${card.setId}/${card.id}`}
                    className="Link__settings"
                  >
                    {card.id}
                  </Link>
                </li>
              ))}
            </ul>
          </form>

          <div className="Nav__navigation_container">
            <Link to="/cart" className="Link__settings">
              <div className="Nav__cart_container">
                <FaShoppingCart className="Nav__cart_icon" />
                <div
                  className={`Nav__cart_display ${
                    showAmount ? "" : "inactive"
                  }`}
                >
                  <div className="Nav__cart_display_inner">
                    {totalCartAmount}
                  </div>
                </div>
              </div>
            </Link>

            <div
              className={`Nav__menu_container ${isActive ? "active" : ""}`}
              onClick={toggleActive}
              ref={inputDropdown}
            >
              <div className="Nav__menu_icon"></div>
            </div>

            <ul
              className={`Nav__dropdown_ul ${isActive ? "active" : ""}`}
              onClick={toggleActive}
            >
              <Link to="/sets" className="Link__settings">
                <li className="Nav__dropdown_li">Sets</li>
              </Link>
              <Link to="/shipping" className="Link__settings">
                <li className="Nav__dropdown_li">Shipping</li>
              </Link>
              <Link to="/about" className="Link__settings">
                <li className="Nav__dropdown_li">About</li>
              </Link>
              <Link to="/contact" className="Link__settings">
                <li className="Nav__dropdown_li">Contact</li>
              </Link>
            </ul>

            {loggedIn ? (
              <>
                <div ref={inputLogout}>
                  <FaUser
                    className="Nav__login_icon"
                    onClick={() => {
                      toggleLogout();
                    }}
                  />
                </div>
                <ul className={`Nav__loggedin_ul ${isLogout ? "active" : ""}`}>
                  <li className="Nav__loggedin_li" onClick={loggingOut}>
                    Logout
                  </li>
                </ul>
              </>
            ) : (
              <Link to="/login" className="Link__settings">
                <FaUser className="Nav__login_icon" />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
