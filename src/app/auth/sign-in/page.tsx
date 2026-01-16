

'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from 'sonner';

function page() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const router = useRouter();

    const submit = async () => {

        if (!email || !password) {
            toast.error("Both email and password required");
            return;
        }

        try {
            const res = await axios.post('/api/admin/auth', {
                email,
                password,
                type: 'login'
            });

            if(res.data.success){
                router.push('/admin');
            }
        } catch (err: any) {
            if (err?.response && err?.response?.data?.message) {
                toast.error(err.response.data.message)
            }
            else {
                toast.error("Something went wrong");
            }
            console.error(err);
        }
    }

    return (
        <>
            <div className={`w-full bg-linear-to-br from-blue-700 via-black to-black min-h-screen relative flex flex-col justify-start items-center`}>
               
                <div className="absolute top-0 z-10 h-full w-full bg-transparent bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
                
                <div className={`w-full z-20 flex justify-center items-center py-4 border-b border-gray-300`}>
                    <img src="/assets/sit-logo-blue.png" className={`h-10`} />
                    <p className={`text-[12px] font-semibold leading-3 text-white`}>SAP Inside Track <br /> Kolkata</p>
                </div>

                <div className={`w-full z-20 flex justify-center items-center`}>
                    <div className={`w-full lg:w-[40%] flex flex-col justify-start items-center pt-10`}>
                        <h3 className={`w-full text-xl font-semibold font-Montserrat text-center text-white`}>Admin Login</h3>

                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className={`w-[90%] py-3 px-3 bg-gray-200 rounded-lg mt-5 outline-none text-sm text-black`} placeholder='Enter email' />
                        <div className={`w-full flex relative justify-center items-center`}>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} className={`w-[90%] py-3 px-3 bg-gray-200 rounded-lg mt-2 outline-none text-sm text-black`} placeholder='Enter password' />
                            <span onClick={() => setVisible(!visible)} className={`absolute opacity-50 top-5 right-10 cursor-pointer`}>{visible ? <FaEye /> : <FaEyeSlash />}</span>
                        </div>
                        <p className={`w-[90%] mt-3 bg-blue-500 text-white text-center rounded-lg shadow-lg border border-blue-700 py-2 cursor-pointer active:scale-95 active:opacity-80 duration-200 ease-in-out`} onClick={submit}>Login</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default page

