import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

export const ContactList = (props) => {
    // console.log(props);
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const contacts = [
        {
            id: "1",
            name: "John",
            email: "john@example.com",
        }
    ];

    const renderContactList = props.contacts.map((contact) => {
        return <ContactCard contact={contact} key={contact.id} clickHandler={deleteContactHandler} />;
    });

    return (
        <div className="mt-4">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mt-8">
                Contact List
                </h2>

                <Link to="/add" className="p-7">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Contact
                    </button>
                </Link>

                
            </div>
            {renderContactList}
        </div>
    );
};

export default ContactList;