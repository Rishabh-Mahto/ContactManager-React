import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function EditContact(props) {
    // console.log(props);
    const location = useLocation();
    const contact = location.state && location.state.contact;

  // Check if contact is defined before accessing its properties
  const { id, name, email } = contact || {};
    const [state, setState] = useState({
      id,
      name,
      email,
  });


  const navigate = useNavigate();

  const update = (e) => {
    e.preventDefault();
    if (state.name === "" || state.email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    props.updateContactHandler(state);
    setState({ name: "", email: ""});
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Contacts</h2>
      <form onSubmit={update}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditContact;
