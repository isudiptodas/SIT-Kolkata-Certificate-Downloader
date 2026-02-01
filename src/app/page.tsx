'use client'

import axios from "axios"
import { useState, useRef, useCallback } from "react"
import { toast } from "sonner";
import { GoDownload } from "react-icons/go";
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'

interface userData {
  name: string,
  organization: string,
  email: string
}

function page() {

  const [name, setName] = useState('');
  const [data, setData] = useState<userData | null>(null);
  const [loading, setLoading] = useState(false);
  const divRef = useRef<HTMLDivElement>(null)


  const getData = async () => {

    if (!name) {
      toast.error("Name required");
      return;
    }

    if (loading) {
      return;
    }

    if(data && data?.name === name.trim()){
      return;
    }

    const msg = toast.loading("Searching...");

    try {
      setLoading(true);
      const res = await axios.get(`/api/user?name=${encodeURIComponent(name.trim())}`);

      if (res.status === 200) {
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
    finally {
      setLoading(false);
      toast.dismiss(msg);
    }
  }

  const download = useCallback(async () => {
    if (!divRef.current) {
      return;
    }

    try {

      const dataUrl = await toPng(divRef.current, { cacheBust: true })

      const img = new Image()
      img.src = dataUrl;

      img.onload = () => {
        const imgWidth = img.width
        const imgHeight = img.height

        const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait'

        const pdf = new jsPDF({
          orientation,
          unit: 'px',
          format: [imgWidth, imgHeight],
        })

        pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight)
        
        const downloadName = name || `SAP_Inside_Track`;

        pdf.save(`${downloadName}.pdf`);
        toast.success("Download started"); 
      }
      catch (err) {
      toast.error("Error downloading pdf");
      console.error(err)
    }
  }, [])

  return (
    <>
      <div className={`w-full bg-linear-to-br from-blue-700 via-black to-black min-h-screen flex flex-col justify-start items-center relative`}>
       
        <div className="absolute top-0 z-10 h-full w-full bg-transparent bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
        
        <div className={`w-full z-20 flex justify-center items-center py-4 border-b border-gray-300`}>
          <img src="/assets/sit-logo-blue.png" className={`h-10`} />
          <p className={`text-[12px] font-semibold leading-3 text-white`}>SAP Inside Track <br /> Kolkata</p>
        </div>

        <div className={`w-full z-20 px-5 h-auto flex flex-col justify-start items-center pt-5 lg:pt-10`}>
          <h2 className={`w-full text-center font-Montserrat text-lg xl:text-3xl text-white`}>SAP Inside Track Kolkata Participation Certificate Downloader</h2>
        </div>

        <div className={`w-full z-20 flex flex-col justify-start items-center pt-5`}>
          <input onChange={(e) => setName(e.target.value)} type="text" className={`w-[90%] md:w-[70%] lg:w-[40%] py-3 px-3 bg-gray-200 text-black rounded-lg outline-none font-Montserrat text-sm`} placeholder="Enter your name" />
          <p onClick={getData} className={`w-[90%] md:w-[70%] lg:w-[40%] mt-2 text-center bg-linear-to-r from-blue-500 to-blue-600 text-white active:scale-95 duration-200 ease-in-out cursor-pointer hover:opacity-80 py-2 rounded-lg`}>Search</p>
        </div>

        <div className={`${data === null ? "hidden" : "block"} z-20 w-[90%] md:w-[70%] pt-10 h-auto flex flex-col justify-center items-center overflow-hidden`}>
          <div ref={divRef} className={`h-56 w-auto md:h-64 lg:h-52 relative bg-red-600`}>
            <p className={`absolute text-[#174777] text-sm left-9 md:left-10 lg:left-9 top-[38%] font-Display`}>{data?.name}</p>
            <p className={`absolute text-[#0a3965] text-[8px] italic left-9 md:left-10 lg:left-8 top-[56%] xl:top-[55%] font-Organization`}>{data?.organization}</p>
            <img crossOrigin="anonymous" src="/assets/certificate-template.jpeg" className="h-full" />
          </div>

          <p onClick={download} className={`w-auto px-3 mt-10 lg:mt-5 py-2 rounded-lg bg-white text-black text-sm cursor-pointer active:opacity-75 duration-200 flex justify-center items-center gap-2`}>Download <span><GoDownload /></span></p>

        </div>
      </div>
    </>
  )
}

export default page















