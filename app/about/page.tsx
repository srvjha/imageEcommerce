import React from "react";

const page = () => {
  return (
    <div className=" min-h-screen flex justify-center w-full">
      <div className=" min-w-[1200px]  mt-4 relative">
        <div className=" grid sm:grid-cols-2 gap-5 py-10 absolute w-full h-full">
          <div className="text-white  flex flex-col  font-semibold font-mono  text-xl">
            <span className="text-4xl font-bold mb-2 font-mono w-full ">What We Do?</span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            illum minima consectetur harum quasi asperiores dicta rem maiores,
            soluta deserunt perspiciatis error eius architecto ut nesciunt
            veritatis, incidunt ipsam eveniet dignissimos eos iure totam
            quisquam atque explicabo. Id nesciunt culpa illum rerum cum error
            minima modi sapiente repellendus, ullam magni?
          </div>
          <div className=" ">
            <img 
            src="https://as2.ftcdn.net/v2/jpg/05/06/75/11/1000_F_506751155_fJ5Ko5T0wsTH7Q9VNwEgo6J81da8arlD.jpg" 
            alt="about-image" 
            className="rounded-xl w-[500px] shadow-lg shadow-white "
  
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
