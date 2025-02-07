export default {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
      {
        name: "orderId",
        type: "string",
        title: "Order ID",
        description: "Unique Order ID for each order",
      },
      {
        name: "clerkuserId",
        type: "string",
        title: "Clerk User ID",
        description: "Clerk User ID ",
      },
      {
        name: "customer",
        type: "reference",
        to: [{ type: "customer" }],
        title: "Customer",
      },
      {
        name: "items",
        type: "array",
        of: [
          {
            type: "object",
            name: "productItem",
            fields: [
              {
                name: "product",
                type: "reference",
                to: [{ type: "product" }],
              },
              {
                name: "name",
                type: "string",
                title: "Product Name",
              },
              {
                name: "image",
                type: "image",
                title: "Product Image",
              },
              {
                name: "quantity",
                type: "number",
              },
              {
                name: "price",
                type: "number",
              },
              {
                name: "paymentMethod",
                type: "string",
                title: "Payment Method",
              },
            ],
          },
        ],
        title: "Items",
      },
      {
        name: "total_price",
        type: "number",
        title: "Total Price",
      },
      {
        name: "order_date",
        type: "string",
        title: "Order_Date",
      },
      {
        name: "status",
        type: "string",
        title: "Order Status",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Completed", value: "completed" },
            { title: "Cancelled", value: "cancelled" },
          ],
        },
      },
    ],
  };
  