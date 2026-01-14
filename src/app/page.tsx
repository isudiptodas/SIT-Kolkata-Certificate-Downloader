'use client' 

function page() {
  return (
    <>
      <div className={`w-full flex justify-center items-center py-4 border-b border-gray-300`}>
        <img src="/assets/sit-logo-blue.png" className={`h-10`}/>
        <p className={`text-[12px] font-semibold leading-3`}>SAP Inside Track <br/> Kolkata</p>
      </div>

      <div className={`w-full px-5 h-auto flex flex-col justify-start items-center pt-5 lg:pt-10`}>
        <h2 className={`w-full text-center font-Montserrat text-lg xl:text-3xl`}>SAP Inside Track Kolkata Participation Certificate Downloader</h2>
      </div>

      <div className={`w-full flex flex-col justify-start items-center pt-5`}>
        <input type="text" className={`w-[90%] md:w-[70%] xl:w-[40%] py-2 px-3 bg-gray-200 text-black rounded-lg outline-none font-Montserrat text-sm`} placeholder="Enter your name"/>
        <p className={`w-[90%] md:w-[70%] xl:w-[40%] mt-2 text-center bg-linear-to-r from-blue-500 to-blue-600 text-white active:scale-95 duration-200 ease-in-out cursor-pointer hover:opacity-80 py-2 rounded-lg`}>Search</p>
      </div>
    </>
  )
}

export default page