'use client'
import axios from 'axios';

function page() {

    const submit = async () => {
        try {
            const res = await axios.post('/api/admin/auth', {
                name: 'Pritam Paul',
                email: 'pritampaul2k17@gmail.com',
                password: 'pritampaul@26',
                type: 'create'
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

            <div className={`w-full flex flex-col justify-start items-center pt-10`}>
                <p className={`w-auto px-5 py-2 rounded-lg shadow-lg border border-gray-400 active:scale-95 duration-200 ease-in-out`} onClick={submit}>Submit</p>
            </div>
        </>
    )
}

export default page