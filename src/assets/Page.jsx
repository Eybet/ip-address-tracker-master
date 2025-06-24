import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import 'leaflet/dist/leaflet.css';
import MyMap from './Map';



const Page = () => {

  const [value, setValue] = useState("");
  const [Data, setData] = useState(null);
  const [IP, setIP] = useState(null);

const Change = (input) => {
  const digits = input.replace(/\D/g, "").slice(0, 12); 
  const results = [];

  const backtrack = (i = 0, parts = []) => {
    if (parts.length === 4 && i === digits.length) {
      results.push(parts.join('.'));
      return;
    }

    if (parts.length >= 4 || i >= digits.length) return;

    for (let len = 1; len <= 3; len++) {
      const segment = digits.slice(i, i + len);

      if (segment.length === 0 || (segment.length > 1 && segment.startsWith("0"))) continue;

      const num = Number(segment);
      if (num > 255) continue;

      backtrack(i + len, [...parts, segment]);
    }
  };

  backtrack();

  return results.length ? results[0] : digits; 
};




  const RealChange = (e) =>{
    const K = e.target.value
    setValue (Change(K))
  }


  useEffect(()=>{
   const getData = async ()=>{
    const res = await axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_6LyfXH8zQu2xjj0rV9FcCgqYZBfIf&ipAddress=${IP}`)
    setData(res.data)
    console.log(res.data);
    
   }
   getData()
  },[IP])
  return (
    <div className='relative flex flex-col items-center'>
      {
        Data && Data.location && (
          <div className=" absolute xl:w-[140vh] xl:h-[18vh] bg-white xl:top-50 z-1000 rounded-xl top-50 flex flex-col gap-4 xl:left-53 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] sm:flex-row sm:gap-10 w-[40vh] justify-center sm:items-start items-center  py-8 md:w-[60vh] md:left-25 md:top-100 md:h-[10vh] md:px-5 ">
        <div className='flex flex-col sm:border-r sm:border-gray-200 sm:w-[26vh] w-[36vh] sm:items-start items-center gap-1 '><span className='text-[12px] font-black text-gray-400'>IP ADDRESS</span> <p className='font-bold text-xl'> {Data.ip} </p></div>
        <div className='flex flex-col sm:border-r sm:border-gray-200 sm:w-[26vh] w-[36vh] sm:items-start items-center gap-1 '><span className='text-[12px] font-black text-gray-400'>LOCATION</span> <p className='font-bold text-xl  '>  {Data.location.country} -  {Data.location.region} </p></div>
        <div className='flex flex-col sm:border-r sm:border-gray-200 sm:w-[26vh] w-[36vh]  sm:items-start items-center gap-1 '><span className='text-[12px] xs:text-5xl font-black text-gray-400'>TIMEZONE</span> <p className='font-bold text-xl'> {Data.location.timezone} </p></div>
        <div className='flex flex-col sm:w-[26vh] w-[36vh]  sm:items-start  items-center gap-1'><span className='text-[12px] font-black text-gray-400'>ISP</span> <p className='font-bold text-xl'> {Data.isp} </p></div>
      </div>
        )
      }
      <div className="w-full gap-8 h-[34vh] bg-[url(./pattern-bg-desktop.png)] flex flex-col items-center xl:gap-7 py-10 md:gap-16  bg-no-repeat bg-cover bg-center md:flex md:justify-center ">
        <h1 className='text-white font-semibold xl:text-2xl md:text-4xl text-3xl'>IP Address Tracker</h1>
        <div className="flex">
         <input value={value} onChange={RealChange} type="text" className='bg-white h-[7vh] w-[32vh] xl:h-[6vh] xs:h-[10vh] md:h-[5vh] md:w-[40vh] xl:w-[50vh] p-0 m-0 rounded-l-xl border-none focus:outline-none px-4 font-semibold ' placeholder='Search for any IP address or domain ' maxLength={15}/> 
         <button className='p-0 m-0 bg-black w-[7vh] h-[7vh] cursor-pointer xl:w-[6vh] xl:h-[6vh] flex items-center justify-center rounded-r-xl hover:bg-[#3f3f3f] md:h-[5vh] md:w-[5vh] ' onClick={()=>{ setIP(value) }}><img src="./icon-arrow.svg" alt="" /></button></div>
      </div>
      <div className="w-full md:h-[60vh]">
           <MyMap/>
      </div>
      
    </div>
  )
}

export default Page
