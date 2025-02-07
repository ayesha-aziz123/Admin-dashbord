"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";

interface Order {
  orderId: string;
  total_price: number;
  order_date: string;
  status: string | null;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    phone: string;
  };
  items: Array<{
    product: { name: string; image: string; price: number };
    quantity: number;
  }>;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const query = `*[_type == "order"]{
          orderId,
          total_price,
          order_date,
          status,
          customer->{
            name,
            email,
            address,
            city,
            phone
          },
          items[] {
            product->{
              name,
              "image": image.asset->url,
              price
            },
            quantity
          }
        }`;
        const fetchedOrders = await client.fetch(query);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold my-5 mb-3 border-b pb-2">Orders Management</h2>

      {/* Search Bar */}
      <div className="flex items-center gap-2 my-4 border p-2 rounded-lg shadow-sm">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by customer name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 outline-none text-gray-700"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg shadow-sm text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Total Price</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  <FaSpinner className="animate-spin text-gray-600 text-2xl mx-auto" />
                </td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <>
                  <tr
                    key={order.orderId}
                    className={`border-t hover:bg-gray-200 cursor-pointer ${
                      selectedOrder === order.orderId ? "bg-gray-300" : ""
                    }`}
                    onClick={() =>
                      setSelectedOrder(
                        selectedOrder === order.orderId ? null : order.orderId
                      )
                    }
                  >
                    <td className="p-3 border">{order.orderId}</td>
                    <td className="p-3 border">{order.customer.name || "N/A"}</td>
                    <td className="p-3 border">{order.customer.email || "N/A"}</td>
                    <td className="p-3 border">${order.total_price}</td>
                    <td className="p-3 border text-center">
                      <span
                        className={`px-2 py-1 text-sm font-medium rounded-lg ${
                          order.status === "completed"
                            ? "bg-green-300 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-200 text-yellow-700"
                            : "bg-red-200 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 border">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                  </tr>

                  {/* Expanded Order Details */}
                  {selectedOrder === order.orderId && (
                    <tr className="bg-gray-50 border-t">
                      <td colSpan={6} className="p-4">
                        <div className="p-4 bg-white shadow-md rounded-lg">
                          <h3 className="font-semibold text-lg mb-2 border-b pb-2">
                            Order Details
                          </h3>
                          <p><strong>Customer Name:</strong> {order.customer.name}</p>
                          <p><strong>Email:</strong> {order.customer.email}</p>
                          <p><strong>Address:</strong> {order.customer.address}, {order.customer.city}</p>
                          <p><strong>Phone:</strong> {order.customer.phone}</p>
                          <h4 className="mt-3 font-semibold border-b pb-2">Items:</h4>
                          <ul className="mt-2">
                            {order.items.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-4 p-2 border-b"
                              >
                                <Image
                                 width={200}
                                 height={200}
                                  src={item.product?.image}
                                  alt={item.product?.name}
                                  className="w-12 h-12 object-cover rounded-md"
                                />
                                <div>
                                  <p className="font-medium">
                                    {item.product?.name || "Unknown Product"}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {item.quantity} x ${item.product?.price || "N/A"}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">No matching orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
