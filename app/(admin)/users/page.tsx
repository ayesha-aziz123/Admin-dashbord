"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const query = `*[_type == "customer"]`;
        const fetchedCustomers = await client.fetch(query);
        setCustomers(fetchedCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search input
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-5">Customers List</h2>

      {/* Search Input */}
      <div className="flex items-center gap-2 border p-2 rounded-lg shadow-sm mb-5">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, email, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 outline-none text-gray-700"
        />
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">City</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  <FaSpinner className="animate-spin text-gray-600 text-2xl mx-auto" />
                </td>
              </tr>
            ) : filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-100 transition-all"
                >
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">{customer.phone}</td>
                  <td className="p-3">{customer.address}</td>
                  <td className="p-3">{customer.city}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
