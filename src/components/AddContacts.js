import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddContacts(props) {
    // console.log(props);
  const [state, setState] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (state.name === "" || state.email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    props.addContactHandler(state);
    setState({ name: "", email: "" });
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Contacts</h2>
      <form onSubmit={add}>
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
          Add
        </button>
      </form>
    </div>
  );
}

export default AddContacts;
