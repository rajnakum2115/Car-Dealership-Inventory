import { useEffect, useState } from "react";

const slides = [

    "/images/ferrari.jpg",
    "/images/lamborghini.jpg",
    "/images/mercedes.jpg"

];

function HeroSlider(){

    const [current,setCurrent]=useState(0);

    useEffect(()=>{

        const interval=setInterval(()=>{

            setCurrent((prev)=>(prev+1)%slides.length);

        },3000);

        return ()=>clearInterval(interval);

    },[]);

    return(

        <div className="w-full h-[500px] overflow-hidden">

            <img
                src={slides[current]}
                className="w-full h-full object-cover transition-all duration-700"
            />

        </div>

    )

}

export default HeroSlider;