import axios from "axios";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const UsersQuery = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/contacts").then((response) => {
      setContacts(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">User Queries</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500">No user queries found</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3 border-b pb-2">
                <h2 className="text-xl font-semibold">{contact.username}</h2>
                <span className="text-sm text-gray-500">
                  {contact.createdAt ? format(new Date(contact.createdAt), "PPP p") : "Date unavailable"}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Email:</span> {contact.email}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Phone:</span> {contact.phone}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-md font-medium mb-2">Message:</h3>
                <p className="text-gray-600 bg-gray-50 p-3 rounded">{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersQuery;