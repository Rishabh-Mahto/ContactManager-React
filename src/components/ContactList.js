import React , { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const ContactList = (props) => {
    console.log(props);
    const inputElement = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };



    const renderContactList = Array.isArray(props.contacts) ? props.contacts.map((contact) => {
        return <ContactCard contact={contact} key={contact.id} clickHandler={deleteContactHandler} />;
    }) : null;


    const getSearchTerm = () => {
        // console.log(inputElement.current.value);
        props.searchKeyword(inputElement.current.value);
    }

    
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
            
        <div className="pb-3">
            <div className="relative">
                <input
                ref={inputElement}
                type="text"
                placeholder="Search Contacts"
                className="w-full border border-gray-300 rounded-md p-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: "#F5F5F5" }}
                value={ props.term}
                onChange={ getSearchTerm }
                />

                <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute right-3 top-2 text-gray-400"
                style={{ color: "#5a5f68" }}
                />
            </div>
        </div>
            {renderContactList.length > 0 ? renderContactList : "No contact found"}
        </div>
    );
};

export default ContactList;