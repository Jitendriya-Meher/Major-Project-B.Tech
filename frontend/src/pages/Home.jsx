// import { useSelector } from "react-redux";
import bannarKids from "../assets/banner_kids.png";
import bannarMens from "../assets/banner_mens.png";
import bannarWomen from "../assets/banner_women.png";

import p1 from '../assets/product_1.png';
import p2 from '../assets/product_2.png';
import p3 from '../assets/product_3.png';
import p4 from '../assets/product_4.png';
import p5 from '../assets/product_21.png';
import p6 from '../assets/product_22.png';
import p7 from '../assets/product_23.png';
import p8 from '../assets/product_19.png';
import p9 from '../assets//product_31.png';
import p10 from '../assets/product_27.png';
import p11 from '../assets/product_28.png';
import p12 from '../assets/product_26.png';
import logo from "../assets/WhatsApp Image 2024-03-15 at 22.54.27_5ad83739.jpg";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import india from "../assets/indiA.jpg"
import { useNavigate } from "react-router-dom";

function Home() {
  // const {username,email,address,phone,isAdmin,isLoggedin} = useSelector((state) => (state.auth));

  const navigate = useNavigate();

  function goToShop () {
    navigate("/dashboard");
  }

  return (
    <div className=" w-11/12 max-w-[1120px] mx-auto min-h-screen mt-5 pb-10">

      <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={2000}
      autoFocus={true}
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      >
        <div>
          <img src={bannarKids} />
        </div>
        <div>
          <img src={bannarMens} />
        </div>
        <div>
          <img src={bannarWomen} />
        </div>
      </Carousel>

      <div className=" mt-10">
        <p className=" text-white text-center text-3xl">
          Our Latest Collections
        </p>
        <div className=" mt-5">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={1000}
            autoFocus={true}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            centerMode={true}
            centerSlidePercentage={25}
            >
              <div className=""
              onClick={goToShop}
              >
                <img src={p1} />
              </div>
              <div className=""
              onClick={goToShop}
              >
                <img src={p2} />
              </div>
              <div className=""
              onClick={goToShop}
              >
                <img src={p3} />
              </div>
              <div className=""
              onClick={goToShop}
              >
                <img src={p4} />
              </div>
              <div className=""
              onClick={goToShop}
              >
                <img src={p5} />
              </div>
              <div className=""
              onClick={goToShop}
              >
                <img src={p6} />
              </div>
              <div className=""
              onClick={goToShop}
              >
                <img src={p7} />
              </div>
              <div className=""
              onClick={goToShop}
              >
                <img src={p8} />
              </div>
              <div className=""
              onClick={goToShop}
              >
                <img src={p9} />
              </div>
              <div className=""
              onClick={goToShop}
              >
                <img src={p10} />
              </div>
              <div className=""
              onClick={goToShop}
              >
                <img src={p11} />
              </div>
              <div className=""
              onClick={goToShop}
              >
                <img src={p12} />
              </div>
            </Carousel>
        </div>
      </div>

      <div className=" mt-5">

      </div>

      {/* footer */}
      
      <div className=" mt-5">

        <div className=" flex flex-wrap gap-20 items-start justify-between p-1 text-white text-sm py-8">

          <div className=" flex flex-col gap-1">
            <h2 className=" font-md font-semibold text-xl text-white pb-2">
              Get to Know Us
            </h2>
            <p>
              About Us
            </p>
            <p>
              Careers
            </p>
            <p>
              Press Releases
            </p>
            <p>
            Shopaholics Science
            </p>
          </div>
          <div className=" flex flex-col gap-1">
            <h2 className=" font-md font-semibold text-xl text-white pb-2">
            Connect with Us
            </h2>
            <p>
            Facebook
            </p>
            <p>
            Twitter
            </p>
            <p>
            Instagram
            </p>
          </div>
          <div className=" flex flex-col gap-1">
            <h2 className=" font-md font-semibold text-xl text-white pb-2">
            Make Money with Us
            </h2>
            <p>
            Sell on Shopaholics
            </p>
            <p>
            Sell under Shopaholics Accelerator
            </p>
            <p>
            Protect and Build Your Brand
            </p>
            <p>
            Shopaholics Global Selling
            </p>
            <p>
            Become an Affiliate
            </p>
            <p>
            Fulfilment by Shopaholics
            </p>
            <p>
            Advertise Your Products
            </p>
            <p>
            Shopaholics Pay on Merchants
            </p>
          </div>
          <div className=" flex flex-col gap-1">
            <h2 className=" font-md font-semibold text-xl text-white pb-2">
              	Let Us Help You
            </h2>
            <p>
            COVID-19 and Shopaholics
            </p>
            <p>
            Your Account
            </p>
            <p>
            Returns Centre
            </p>
            <p>
            100% Purchase Protection
            </p>
            <p>
            Shopaholics App Download
            </p>
            <p>
            Help
            </p>
          </div>
        </div>

        <div className=" h-[0.1rem] bg-gray-500 my-2"></div>
        <div className=" flex items-center justify-center mt-5">
          <div className=" h-24 p-4 rounded-full">
            <img src={logo} alt="" className=" h-full rounded-md" />
          </div>
          <p className=" text-white">
            shopaholics
          </p>
          <div className=" h-24 p-4 rounded-full pl-40">
            <img src={india} alt="" className=" h-full rounded-md" />
          </div>
        </div>
        <h2 className=" text-center text-xl p-4">
            Copyright @ 2024 - All Right Reserved
        </h2>
      </div>


    </div>
  );
}

export default Home;
