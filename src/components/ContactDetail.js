import React from "react";
import { Link, useLocation } from "react-router-dom";
import user from "../images/user.png";

const ContactDetail = (props) => {
    const location = useLocation();
    const { name, email } = location.state.contact;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <img src={user} alt="User" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <div className="text-2xl font-semibold mb-2">{name}</div>
                <div className="text-blue-600">{email}</div>
            </div>
            <div className="mt-4">
                <Link to="/">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Back to Contact List
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ContactDetail;
