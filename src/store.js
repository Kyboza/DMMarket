// store.js
import postsAPI from "./api/postsAPI";
import { createStore, action, computed, thunk } from "easy-peasy";
import { cardList } from "./data/cardList";
import { cardDM02 } from "./data/cardDM02";
import { cardDM03 } from "./data/cardDM03";
import { cardDM04 } from "./data/cardDM04";
import { cardDM05 } from "./data/cardDM05";
import { cardDM06 } from "./data/cardDM06";
import { cardDM07 } from "./data/cardDM07";
import { cardDM08 } from "./data/cardDM08";
import { cardDM09 } from "./data/cardDM09";
import { cardDM10 } from "./data/cardDM10";
import { cardDM11 } from "./data/cardDM11";
import { cardDM12 } from "./data/cardDM12";

const storeModel = {
  formFields: {
    username: "",
    setUsername: action((state, payload) => {
      state.username = payload;
    }),

    email: "",
    setEmail: action((state, payload) => {
      state.email = payload;
    }),

    password: "",
    setPassword: action((state, payload) => {
      state.password = payload;
    }),

    newPassword: "",
    setNewPassword: action((state, payload) => {
      state.newPassword = payload;
    }),

    confirmNewPassword: "",
    setConfirmNewPassword: action((state, payload) => {
      state.confirmNewPassword = payload;
    }),

    showPassword: "",
    setShowPassword: action((state, payload) => {
      state.showPassword = payload;
    }),

    showConfirmPassword: "",
    setConfirmShowPassword: action((state, payload) => {
      state.showConfirmPassword = payload;
    }),

    resetFields: action((state) => {
      state.username = "";
      state.password = "";
      state.email = "";
      state.newPassword = "";
      state.confirmNewPassword = "";
    }),
  },

  transferInfo: {
    loggedIn: false,
    setLoggedIn: action((state, payload) => {
      state.loggedIn = payload;
      localStorage.setItem("loggedInValue", JSON.stringify(payload));
    }),

    isLogout: false,
    toggleLogout: action((state) => {
      state.isLogout = !state.isLogout;
    }),

    registerUser: thunk(async (actions, payload) => {
      try {
        const response = await postsAPI.post("/register", payload);
        console.log(response.data);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }),

    loginUser: thunk(async (actions, payload) => {
      try {
        const response = await postsAPI.post("/auth", payload);
        console.log(response.data);
      } catch (error) {
        console.error("Login Failed:", error);
      }
    }),

    logoutUser: thunk(async () => {
      try {
        const response = await postsAPI.get("/logout");
        console.log(response.data);
        return response;
      } catch (error) {
        console.log("Could not log you out:", error);
      }
    }),

    sendResetEmail: thunk(async (actions, { email }) => {
      try {
        console.log("Sending reset email...");
        const response = await postsAPI.post("/emailverification", { email });
        console.log("Email sent successfully:", response.data);
        return response;
      } catch (error) {
        console.error("Sending reset email failed:", error);
        throw error;
      }
    }),

    refreshUserToken: thunk(async () => {
      try {
        const response = await postsAPI.get("/refresh");
        console.log(response.data);
        return response;
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    }),

    sendVerificationCode: thunk(async (actions, payload) => {
      try {
        const response = await postsAPI.post("/verifycode", payload);
        console.log(response.data);
      } catch (error) {
        console.error("Verification code failed:", error);
        throw error;
      }
    }),

    sendNewPassword: thunk(async (actions, payload) => {
      try {
        const response = await postsAPI.post("/new-password", payload);
        console.log(response.data);
        return response;
      } catch (error) {
        console.error("Password update failed:", error);
        throw error;
      }
    }),
  },

  postFunction: {
    posts: [],
    setPosts: action((state, payload) => {
      state.posts = payload;
      localStorage.setItem("posts", JSON.stringify(state.posts));
    }),

    postName: "",
    setPostName: action((state, payload) => {
      state.postName = payload;
    }),

    postPhone: "",
    setPostPhone: action((state, payload) => {
      state.postPhone = payload;
    }),

    postAddress: "",
    setPostAddress: action((state, payload) => {
      state.postAddress = payload;
    }),

    postCode: "",
    setPostCode: action((state, payload) => {
      state.postCode = payload;
    }),

    postBody: "",
    setPostBody: action((state, payload) => {
      state.postBody = payload;
    }),

    addPost: thunk(async (actions, newPost, helpers) => {
      const { posts } = helpers.getState();
      try {
        const response = await postsAPI.post("/posts", newPost);
        actions.setPosts([...posts, response.data]);
        actions.setPostName("");
        actions.setPostPhone("");
        actions.setPostAddress("");
        actions.setPostCode("");
        actions.setPostBody("");
      } catch (error) {
        console.error("Problem adding post:", error);
      }
    }),
  },

  searchEngine: {
    allCards: computed(() => [
      ...cardDM02,
      ...cardDM03,
      ...cardDM04,
      ...cardDM05,
      ...cardDM06,
      ...cardDM07,
      ...cardDM08,
      ...cardDM09,
      ...cardDM10,
      ...cardDM11,
      ...cardDM12,
      ...cardList,
    ]),

    search: "",
    setSearch: action((state, payload) => {
      state.search = payload;
    }),

    matchingCards: computed((state) => {
      const searchTerm = state.search?.toLowerCase() || "";
      return searchTerm
        ? state.allCards.filter((card) =>
            card.id?.toLowerCase().includes(searchTerm)
          )
        : [];
    }),
  },

  homeDropDown: {
    isActive: false,
    toggleActive: action((state) => {
      state.isActive = !state.isActive;
    }),
  },

  cart: {
    items: [],
    addToCart: action((state, payload) => {
      const existingItem = state.items.find((item) => item.id === payload.id);
      if (existingItem) {
        existingItem.amount += payload.amount;
      } else {
        state.items.push(payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    }),

    checkoutCart: thunk(async (actions, cartItems) => {
      try {
        if (!cartItems || cartItems.length === 0)
          throw new Error("Cart is empty");
        const response = await postsAPI.post("/create-checkout-session", {
          cartItems,
        });
        if (response.data?.url) return { url: response.data.url };
        throw new Error("Invalid response from server");
      } catch (error) {
        console.error("CheckoutCart Error:", error);
        throw error;
      }
    }),

    formData: {
      fullName: "",
      phone: "",
      email: "",
      country: "",
      address: "",
      postalNumber: "",
    },

    setFormData: action((state, payload) => {
      state.formData = payload;
      localStorage.setItem("formData", JSON.stringify(state.formData));
    }),

    clearFormData: action((state) => {
      state.formData = {
        fullName: "",
        phone: "",
        email: "",
        country: "",
        address: "",
        postalNumber: "",
      };
      localStorage.removeItem("formData");
    }),

    removeFromCart: action((state, index) => {
      state.items.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    }),

    increaseCart: action((state, index) => {
      const cardAtIndex = state.items[index];
      if (cardAtIndex) cardAtIndex.amount += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    }),

    decreaseCart: action((state, index) => {
      const cardAtIndex = state.items[index];
      if (cardAtIndex.amount > 1) cardAtIndex.amount -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    }),

    initializeCart: action((state) => {
      try {
        const storedItems = localStorage.getItem("cartItems");
        state.items = storedItems ? JSON.parse(storedItems) : [];
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        state.items = [];
      }
    }),

    clearCart: action((state) => {
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    }),
  },

  deliveryInfo: {
    orders: [],
    submitInfo: action((state, payload) => {
      state.orders.push(payload);
      localStorage.setItem("completedOrders", JSON.stringify(state.orders));
    }),

    initializeOrder: action((state) => {
      try {
        const storedInfo = localStorage.getItem("completedOrders");
        state.orders = storedInfo ? JSON.parse(storedInfo) : [];
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        state.orders = [];
      }
    }),

    clearOrders: action((state) => {
      state.orders = [];
    }),
  },
};

const store = createStore(storeModel);

export default store;
