import Footer from "./Footer";
import "./home.css";
import bannerIMg from '../../assets/banner.png'
import { useEffect } from "react";

function Home() {

  useEffect(() =>{
    const testApi = async () =>{
      try{
        const res = await fetch('htt;://localhost:5000/',{method:"GET"});
        const data = await res.json();
        console.log(data);
      }catch(e){
        console.log(e)
      }
    }
    testApi();
  })
  return (
    <div className='home-main-container text-center flex flex-col items-center justify-between w-full '>
      <main className="flex home-content w-full">
        <div className="flex banner-container w-full">
          {/* Text overlay */}
          <div className="banner-text-container">
            <h1>Welcome to BookWebStore</h1>
            <p>Browse and discover your favorite books.</p>
          </div>
          {/* Banner image */}
          <div className="banner-imag-container">
          <img src={bannerIMg} alt="Banner" className="banner-image" />
          </div>
        </div>
        <div>
        </div>
      </main>
      <div>
      <Footer />
      </div>
    </div>
  );
}

export default Home;
