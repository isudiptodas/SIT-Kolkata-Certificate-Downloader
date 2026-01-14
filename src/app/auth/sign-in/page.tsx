

'use client'
import axios from 'axios';
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from 'sonner';

function page() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

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

            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className={`w-full flex justify-center items-center py-4 border-b border-gray-300`}>
                <img src="/assets/sit-logo-blue.png" className={`h-10`} />
                <p className={`text-[12px] font-semibold leading-3`}>SAP Inside Track <br /> Kolkata</p>
            </div>

            <div className={`w-full flex justify-center items-center`}>
                <div className={`w-full lg:w-[40%] flex flex-col justify-start items-center pt-10`}>
                    <h3 className={`w-full text-xl font-semibold font-Montserrat text-center`}>Admin Login</h3>

                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className={`w-[90%] py-3 px-3 bg-gray-200 rounded-lg mt-5 outline-none text-sm text-black`} placeholder='Enter email' />
                    <div className={`w-full flex relative justify-center items-center`}>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type={visible ? "text" : "password"} className={`w-[90%] py-3 px-3 bg-gray-200 rounded-lg mt-2 outline-none text-sm text-black`} placeholder='Enter password' />
                        <span onClick={() => setVisible(!visible)} className={`absolute opacity-50 top-5 right-10 cursor-pointer`}>{visible ? <FaEye /> : <FaEyeSlash />}</span>
                    </div>
                    <p className={`w-[90%] mt-3 bg-white text-center rounded-lg shadow-lg border border-gray-300 py-2 cursor-pointer active:scale-95 duration-200 ease-in-out`} onClick={submit}>Login</p>
                </div>
            </div>
        </>
    )
}

export default page