import Slider from "react-slick"
import Image1 from "../assets/image/man5.jpg"
import Image2 from "../assets/image/women5.jpg"
import Image3 from "../assets/image/women6.jpg"
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";




const ImageList = [
    {
        id: 1,
        img: Image1,
        title: "Zľavy až do 50% na všetko pánske oblečenie",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 2,
        img: Image2,
        title: "30% zľava na všetko dámske oblečenie",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 3,
        img: Image3,
        title: "70% zľava na všetky produkty v akcii",
        description:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
];



const Home = () => {
    var settings = {
        dots: true,
        arrows: false,
        infinity: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        cssEase: "ease-in-out",
        pauseOnFocus: true,
    }

    const navigate = useNavigate(); // Hook na navigáciu

    useEffect(() => {
        AOS.init();
    }, []);



    return (
        <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-[--white] flex justify-center items-center duration-200 ">
            
            <div className="container pb-8 px-10 py-4 sm:pb-0">
                <Slider {...settings}>
                    {ImageList.map((data) => (
                        <div key={data.id}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 text-[--black]">
                                {/* text content section */}
                                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                                    <h1
                                        data-aos="zoom-out"
                                        data-aos-duration="1000"
                                        data-aos-once="true"
                                        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-emerald-900 via-purple-300 to-teal-500"
                                    >
                                        {data.title}
                                    </h1>
                                    <p
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay="100"
                                        className="text-sm"
                                    >
                                        {data.description}
                                    </p>
                                    <div
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay="300"
                                    >
                                        <button
                                            onClick={() => navigate("/login")} // Navigácia na stránku prihlásenia
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded px-3.5 py-2.5 text-sm font-medium text-[--white] bg-gradient-to-r from-teal-700 to-teal-400  shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                                        >
                                            Prihlásiť sa
                                        </button>
                                    </div>
                                </div>
                                {/* image section */}
                                <div className="order-1 sm:order-2">
                                    <div
                                        data-aos="zoom-in"
                                        data-aos-once="true"
                                        className="relative z-10"
                                    >
                                        <img
                                            src={data.img}
                                            alt=""
                                            className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Home;
