"use client";
import Layout from "@/components/layout";
import React from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CountUp from "react-countup";
import Chart from "@/components/chart-line-interactive";
import { FaShoppingCart } from "react-icons/fa";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";


interface Order {
  total_price: number;
}


const Dashboard = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const query = `*[_type == "order"]`; // Fetch all orders
        const orders = await client.fetch(query);

        const total = orders.reduce(
          (acc: number, order:Order) => acc + order.total_price,
          0
        );
        setTotalSales(total);
      } catch (error) {
        console.error("Error fetching total sales:", error);
      }
    };

    fetchTotalSales();
  }, []);

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const query = `count(*[_type == "order"])`;
        const totalOrders = await client.fetch(query);
        setOrderCount(totalOrders);
      } catch (error) {
        console.error("Error fetching order count:", error);
      }
    };

    fetchOrderCount();
  }, []);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const query = `count(*[_type == "product"])`;
        const totalProducts = await client.fetch(query);
        setProductCount(totalProducts);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const query = `count(*[_type == "customer"])`; // Assuming there's a customer document in your schema
        const totalCustomers = await client.fetch(query);
        setCustomerCount(totalCustomers);
      } catch (error) {
        console.error("Error fetching customer count:", error);
      }
    };

    fetchCustomerCount();
  }, []);

  return (
    <>
      <Layout>
        <div className="grid grid-cols-4 gap-6 text-center">
          <div className="lg:col-span-1 sm:col-span-4 col-span-4 bg-white">
            <div className="mx-auto bg-blue-300 border-2 rounded-xl shadow-lg hover:scale-105 transition-all ease-in duration-300 cursor-pointer">
              <div className="flex justify-center items-center">
                <div className="ml-5 mt-5">
                  <PeopleAltIcon fontSize="large" />
                </div>
              </div>
              <div className="pl-7 py-5">
                <div className="text-blue-700 text-2xl font-semibold">
                  Total Users
                </div>
                <div className="text-3xl font-semibold">
                  <CountUp start={0} end={customerCount} delay={1}>
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 sm:col-span-4 col-span-4">
            <div className="mx-auto bg-blue-300 rounded-xl shadow-lg hover:scale-105 transition-all ease-in duration-300 cursor-pointer">
              <div className="flex justify-center items-center">
                <div className="ml-5 mt-5 text-3xl">
                  <FaShoppingCart />
                </div>
              </div>
              <div className="pl-7 py-5">
                <div className="text-blue-700 text-2xl font-semibold">
                  Total Sales
                </div>
                <div className="text-3xl font-semibold">
                  {
                    <CountUp start={0} end={totalSales} delay={1}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 sm:col-span-4 col-span-4">
            <div className="mx-auto bg-blue-300 rounded-xl shadow-lg hover:scale-105 transition-all ease-in duration-300 cursor-pointer">
              <div className="flex justify-center items-center">
                <div className="ml-5 mt-5">
                  <GroupAddIcon fontSize="large" />
                </div>
              </div>
              <div className="pl-7 py-5">
                <div className="text-blue-700 text-2xl  font-semibold">
                  Total Orders
                </div>
                <div className="text-3xl font-semibold">
                  <CountUp start={0} end={orderCount} delay={1}>
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 sm:col-span-4 col-span-4">
            <div className="mx-auto bg-blue-300 rounded-xl shadow-lg hover:scale-105 transition-all ease-in duration-300 cursor-pointer">
              <div className="flex justify-center items-center">
                <div className="ml-5 mt-5">
                  <InventoryIcon fontSize="large" />
                </div>
              </div>
              <div className="pl-7 py-5">
                <div className="text-blue-700 text-2xl font-semibold">
                  Total Products
                </div>
                <div className="text-3xl font-semibold">
                  <CountUp start={0} end={productCount} delay={1}>
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-5">
          <Chart />
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
