import React from "react";
import home from '../assets/home.png'


const NavBar = React.lazy(() => import('../components/NavBar'))


 function HomePage() {


  return (
    <>
      <div className="w-full px-5 pt-5">
        <NavBar />
      </div>
      <div className="w-full flex justify-center min-h-[50vh] items-center px-10 ">
           <div className="w-full flex flex-col gap-5" >
              <h1 className="font-semibold text-5xl">Discover Fashion That Defines You</h1>
              <h1 className="font-semibold text-3xl text-purple-600">Shop the Latest Trends, Delivered to Your Door</h1>
              <p className="font-semibold text-base ">Explore a curated collection of premium clothing, accessories, and everyday essentials designed to elevate your style. <br />
              From bold new arrivals to timeless classics, we bring you quality, comfort, and great prices—all in one place. <br />
               Shop confidently with fast delivery, secure checkout, and a seamless shopping experience built just for you.</p>
           </div>
           <div>
            <img src={home} alt="" />
           </div>
      </div>

    </>
  )
}

export default HomePage