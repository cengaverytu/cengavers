import { useNavigate } from "react-router"


export default function AdminPanel() {

    const navigate = useNavigate();

    return (

        <>
            <section className="min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-center ">
                <button 
                onClick={() => navigate(`/messages`)}
                className="text-left border rounded-lg shadow p-6 bg-blue-200 hover:shadow-lg hover:bg-blue-400 transition" >
                    Messages
                </button>

            </section>
        </>
    )
}