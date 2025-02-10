import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./components/Home";
import SetSelection from "./components/SetSelection";
import Cart from "./components/Cart";
import About from "./components/About";
import Shipping from "./components/Shipping";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import Articles from "./components/Articles";
import Contact from "./components/Contact";

import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import NewPassword from "./components/NewPassword";
import CodeInput from "./components/CodeInput";

import UniqueArticle from "./components/Articles/UniqueArticle";
import Card from "./components/SingularCards/Card";
import StarterDeck from "./components/StarterDecks/StarterDeck";

import DM01 from "./components/Sets/DM01";
import DM02 from "./components/Sets/DM02";
import DM03 from "./components/Sets/DM03";
import DM04 from "./components/Sets/DM04";
import DM05 from "./components/Sets/DM05";
import DM06 from "./components/Sets/DM06";
import DM07 from "./components/Sets/DM07";
import DM08 from "./components/Sets/DM08";
import DM09 from "./components/Sets/DM09";
import DM10 from "./components/Sets/DM10";
import DM11 from "./components/Sets/DM11";
import DM12 from "./components/Sets/DM12";

import Error from "./components/Error";

function App() {
  return (
    <div className="App">
      <Header />

      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sets" element={<SetSelection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/enterverification" element={<CodeInput />} />

        <Route path="/article/:articleId" element={<UniqueArticle />} />
        <Route path="/card/:setId/:cardId" element={<Card />} />
        <Route path="/starter/:starterId" element={<StarterDeck />} />

        <Route path="/dm01" element={<DM01 />} />
        <Route path="/dm02" element={<DM02 />} />
        <Route path="/dm03" element={<DM03 />} />
        <Route path="/dm04" element={<DM04 />} />
        <Route path="/dm05" element={<DM05 />} />
        <Route path="/dm06" element={<DM06 />} />
        <Route path="/dm07" element={<DM07 />} />
        <Route path="/dm08" element={<DM08 />} />
        <Route path="/dm09" element={<DM09 />} />
        <Route path="/dm10" element={<DM10 />} />
        <Route path="/dm11" element={<DM11 />} />
        <Route path="/dm12" element={<DM12 />} />

        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
