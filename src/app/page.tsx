'use client'

import axios from "axios"
import { useState } from "react"
import { toast } from "sonner";
import { GoDownload } from "react-icons/go";

interface userData {
  name: string,
  organization: string,
  email: string
}

function page() {

  const [name, setName] = useState('');
  const [data, setData] = useState<userData | null>(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {

    if (!name) {
      toast.error("Name required");
      return;
    }

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`/api/user?name=${encodeURIComponent(name)}`);

      if(res.status === 200){
        setData(res.data.found);
      }
    } catch (err: any) {
      console.log('error -> ', err);
      if (err.response.data.message) {
        toast.error(err.response.data.message);
      }
      else {
        toast.error('Something went wrong');
      }
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <>
      <div className={`w-full bg-linear-to-br from-blue-700 via-black to-black min-h-screen flex flex-col justify-start items-center relative`}>
        <div className={`w-full flex justify-center items-center py-4 border-b border-gray-300`}>
          <img src="/assets/sit-logo-blue.png" className={`h-10`} />
          <p className={`text-[12px] font-semibold leading-3 text-white`}>SAP Inside Track <br /> Kolkata</p>
        </div>

        <div className={`w-full px-5 h-auto flex flex-col justify-start items-center pt-5 lg:pt-10`}>
          <h2 className={`w-full text-center font-Montserrat text-lg xl:text-3xl text-white`}>SAP Inside Track Kolkata Participation Certificate Downloader</h2>
        </div>

        <div className={`w-full flex flex-col justify-start items-center pt-5`}>
          <input onChange={(e) => setName(e.target.value)} type="text" className={`w-[90%] md:w-[70%] lg:w-[40%] py-2 px-3 bg-gray-200 text-black rounded-lg outline-none font-Montserrat text-sm`} placeholder="Enter your name" />
          <p onClick={getData} className={`w-[90%] md:w-[70%] lg:w-[40%] mt-2 text-center bg-linear-to-r from-blue-500 to-blue-600 text-white active:scale-95 duration-200 ease-in-out cursor-pointer hover:opacity-80 py-2 rounded-lg`}>Search</p>
        </div>

        <div className={`w-[90%] md:w-[70%] pt-10 h-auto flex flex-col justify-center items-center overflow-hidden`}>
          <div className={`h-56 w-auto md:h-64 lg:h-52 relative bg-red-600`}>
            <p className={`absolute left-106`}>Sudipto Das</p>
            <img src="/assets/certificate-template.jpeg" className="h-full"/>
          </div>

          <p className={`w-auto px-3 mt-10 lg:mt-5 py-2 rounded-lg bg-white text-black text-sm cursor-pointer active:opacity-75 duration-200 flex justify-center items-center gap-2`}>Download <span><GoDownload /></span></p>

        </div>
      </div>
    </>
  )
}

export default page