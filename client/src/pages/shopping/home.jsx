import { ChevronLeftIcon , Footprints ,CloudLightning , BabyIcon , WatchIcon ,ShirtIcon, ChevronRightIcon } from "lucide-react";
import banner1 from "../../assets/banner-1.webp" 
import banner2 from "../../assets/banner-2.webp" 
import banner3 from "../../assets/banner-3.webp" 
import {useState , useEffect} from 'react' ;
 function ShoppingHome() {

    const slides = [banner1 , banner2 , banner3];
    const [currSlide , setCurrSlide] = useState(0);
    useEffect(() => {
        const timer = setInterval(() =>{
            setCurrSlide(prev => (prev+1) % slides.length)}
        ,4000)
        return () => clearInterval(timer); 
    } ,[])

    return ( 
    <div className = "flex flex-col min-h-screen">

        <div className = "relative w-full h-[600px] ">
                {
                    slides.map((slide , index) => <img src = {slide} key ={index} className = {` ${index === currSlide ? 'opacity-100' : 'opacity-0' } absolute top-0 left-0 w-full h-full object-cover transtion-opacity duration-1000`} />)
                }
                <button onClick = {() => setCurrSlide(prev => (prev-1+slides.length)%slides.length)} className = "absolute top-1/2 left-4 rounded-sm transform p-2 -transalte-y-1/2 bg-white/80">
                <ChevronLeftIcon className = "w-4 h-4" /> </button>
                <button size = "icon" onClick = {() => setCurrSlide(prev => (prev + 1 )%slides.length)} className = "absolute top-1/2 right-4 p-2 rounded-sm transform -transalte-y-1/2 bg-white">
                <ChevronRightIcon className = "w-4 h-4" /> </button>
    
        </div>
        <div className = "container h-[300px] px-12 bg-blue-100">
            <h2 className = "text-3xl font-bold text-center my-8"> Shop by Category</h2>
            <div className = "grid grrid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 ">
                
                <div className = " bg-white flex flex-col h-[150px] justify-center items-center cursor-pointer hover:shadow-xl transition-shadow"> 
                    <div> <ShirtIcon className = "w-12 h-12" /> </div>
                    <span> Men </span>
                </div>
                <div className = "bg-white flex flex-col h-[150px] justify-center items-center cursor-pointer hover:shadow-xl transition-shadow"> 
                    <div> <CloudLightning className = "w-12 h-12" /> </div>
                    <span> Women </span>
                </div>
                <div className = "bg-white flex flex-col h-[150px] justify-center items-center  cursor-pointer hover:shadow-xl transition-shadow"> 
                    <div> <WatchIcon className = "w-12 h-12"/> </div>
                    <span> Accessories </span>
                </div>
                <div className = "bg-white flex flex-col h-[150px] justify-center items-center  cursor-pointer hover:shadow-md transition-shadow"> 
                    <div> <BabyIcon className = "w-12 h-12"/> </div>
                    <span> Kids </span>
                </div>
                <div className = "bg-white flex flex-col h-[150px] justify-center items-center  cursor-pointer hover:shadow-md transition-shadow"> 
                    <div> <Footprints className = "w-12 h-12"/> </div>
                    <span> shoe </span>
                </div>
      
            </div>
        </div>
    </div> );
 }
 
 export default ShoppingHome;