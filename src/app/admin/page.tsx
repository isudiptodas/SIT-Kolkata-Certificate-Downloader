'use client'

import { useEffect, useState } from "react"
import { toast } from "sonner";
import { FaTrash } from "react-icons/fa";
import axios from 'axios'
import { useRouter } from "next/navigation";

function page() {

    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await axios.get('/api/admin/auth', {
                    withCredentials: true
                });

                console.log(res);
            } catch (error) {
                router.push('/auth/sign-in');
            }
        }

        //verify();
    }, [])

    const uploadFile = async () => {

        if (uploading) {
            return;
        }
        if (!csvFile) {
            return;
        }

        const formdata = new FormData();
        formdata.append('file', csvFile);

        const loading = toast.loading('Uploading...please wait');
        setUploading(true);

        try {
            const res = await axios.post('/api/admin/upload', formdata, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(res.data);
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
            toast.dismiss(loading);
            setUploading(false);
            setCsvFile(null);
            toast.success("File uploaded");
        }
    }

    return (
        <>
            <div className={`w-full min-h-screen flex flex-col justify-start items-center relative bg-linear-to-br from-blue-700 via-black to-black`}>
                <div className={`w-full flex justify-center items-center py-4 border-b border-gray-300`}>
                    <img src="/assets/sit-logo-blue.png" className={`h-10`} />
                    <p className={`text-[12px] font-semibold leading-3 text-white`}>SAP Inside Track <br /> Kolkata</p>
                </div>

                <div className={`w-full px-5 h-auto flex flex-col justify-start items-center pt-5 md:pt-10`}>
                    <h2 className={`w-full text-center font-Montserrat text-2xl font-semibold text-white`}>Admin Panel</h2>

                    <div className={`w-[90%] ${csvFile === null ? "block" : "hidden"} md:w-[60%] lg:w-[40%] cursor-pointer relative flex flex-col justify-center items-center py-5 px-3 overflow-hidden mt-5 rounded-lg border-2 border-gray-400 border-dotted`}>
                        <p className={`w-full font-Montserrat text-center text-[14px] opacity-70 text-white`}>Upload your file</p>
                        <p className={`w-full font-Montserrat text-center text-[10px] opacity-70 text-white`}>only csv files</p>
                        <input onChange={(e) => {
                            if (e.target.files && e.target.files[0].name.endsWith('.csv')) {
                                setCsvFile(e.target.files[0]);
                            }
                            else {
                                toast.error('Only CSV files allowed');
                            }
                        }} type="file" className={`h-80 absolute inset-6 left-20 opacity-0`} />
                    </div>

                    <div className={`w-full ${csvFile === null ? "hidden" : "block"} px-4 mt-5 flex flex-col justify-start items-center gap-2`}>
                        <p className={`font-Montserrat text-[14px] lg:text-lg text-white`}>{csvFile ? `${csvFile.name}`:`unknown`}</p>
                        <div className="w-auto mt-3 flex justify-between items-ce text-whitenter gap-4">
                            <p onClick={() => setCsvFile(null)} className={`font-Montserrat active:opacity-75 duration-200 ease-in-out cursor-pointer w-auto bg-red-500 rounded-lg flex justify-center items-center text-white px-5 py-2 gap-2`}>Remove <span className="text-sm"><FaTrash /></span></p>
                            <p onClick={uploadFile} className={`font-Montserrat active:opacity-75 duration-200 ease-in-out cursor-pointer w-auto bg-white rounded-lg flex justify-center items-center text-black px-5 py-2 gap-2 shadow-lg border border-gray-500`}>Upload</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page