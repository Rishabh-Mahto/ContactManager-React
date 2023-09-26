import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const ContactCard = (props) => {
    // console.log(props);
  const { name, email, id } = props.contact;
  
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4 flex items-center">
      <img src={user} alt="User" className="w-12 h-12 rounded-full mr-4" />
      <div className="flex-1">
      <Link 
        to={{
          pathname: `/contact/${id}`, 
        }}
        state = {{contact: props.contact}}
      >
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-blue-600">{email}</div>
      </Link>

      </div>
      <div className="text-red-500 flex gap-3">
        
        <Link           //Edit Icon
        to={`/edit/${id}`} state={{ contact: props.contact }}
        >
        <FontAwesomeIcon icon={ faPenToSquare } style={{ color: "#1814f5" }} />
        </Link>

        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#f54c14" }} onClick={() => props.clickHandler(id)} />
        
      </div>
    </div>
  );
}

export default ContactCard;
