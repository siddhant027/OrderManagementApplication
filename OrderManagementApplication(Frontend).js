import React, { useEffect, useState } from "react";
import axios from "axios";

const statusOptions = ["All", "COMPLETED", "CONTINUING", "RESTITUTE", "CANCELED"];

const OrderManagement = () => {
  const [filters, setFilters] = useState({
    orderId: "",
    customer: "",
    orderItem: "",
    startDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: "",
    status: "All",
    page: 0,
    size: 10
  });
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchOrders = async () => {
    const payload = {
      page: filters.page,
      size: filters.size
    };

    if (filters.orderId) payload.orderId = filters.orderId;
    if (filters.customer) payload.customer = filters.customer;
    if (filters.orderItem) payload.orderItem = filters.orderItem;
    if (filters.startDate) payload.startDate = filters.startDate;
    if (filters.endDate) payload.endDate = filters.endDate;
    if (filters.minPrice) payload.minPrice = parseFloat(filters.minPrice);
    if (filters.maxPrice) payload.maxPrice = parseFloat(filters.maxPrice);
    if (filters.status && filters.status !== "All") payload.status = filters.status;

    try {
      const response = await axios.post("http://localhost:8080/api/orders/filter", payload);
      setOrders(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Fetching orders failed:", error);
    }
  };

  // Fetch when page or filters.status changes
  useEffect(() => {
    fetchOrders();
  }, [filters.page, filters.status]);

  return (
    <div style={{ padding: 20, backgroundColor: "#121212", color: "#fff", minHeight: "100vh" }}>
      <h2>Order Details</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        {/* Dropdown Filters */}
        {["orderId", "customer", "orderItem"].map((field) => (
          <select
            key={field}
            value={filters[field]}
            onChange={(e) => setFilters(prev => ({ ...prev, [field]: e.target.value, page: 0 }))}
            style={{ padding: 8, backgroundColor: "#1e1e1e", color: "#fff", border: "1px solid #444", borderRadius: 4 }}
          >
            <option value="">All {field}</option>
            {Array.from(new Set(orders.map(o => o[field]))).map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        ))}

        {/* Date Pickers */}
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value, page: 0 }))}
          style={{ padding: 8, backgroundColor: "#1e1e1e", color: "#fff", border: "1px solid #444", borderRadius: 4 }}
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value, page: 0 }))}
          style={{ padding: 8, backgroundColor: "#1e1e1e", color: "#fff", border: "1px solid #444", borderRadius: 4 }}
        />

        {/* Price Range Inputs */}
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value, page: 0 }))}
          style={{ width: 100, padding: 8, backgroundColor: "#1e1e1e", color: "#fff", border: "1px solid #444", borderRadius: 4 }}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value, page: 0 }))}
          style={{ width: 100, padding: 8, backgroundColor: "#1e1e1e", color: "#fff", border: "1px solid #444", borderRadius: 4 }}
        />

        {/* Status Dropdown */}
        <select
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 0 }))}
          style={{ padding: 8, backgroundColor: "#1e1e1e", color: "#fff", border: "1px solid #444", borderRadius: 4 }}
        >
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search general"
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          onKeyDown={(e) => { if (e.key === "Enter") fetchOrders(); }}
          style={{ flexGrow: 1, padding: 8, backgroundColor: "#1e1e1e", color: "#fff", border: "1px solid #444", borderRadius: 4 }}
        />

        <button
          onClick={() => { setFilters(prev => ({ ...prev, page: 0 })); fetchOrders(); }}
          style={{ padding: "8px 16px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: 4 }}
        >
          Apply
        </button>
      </div>

      {/* Orders Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#1e1e1e" }}>
        <thead>
          <tr style={{ backgroundColor: "#2d2d2d" }}>
            {["Order ID", "Customer", "Item", "Delivery Date", "Price", "Status"].map(col => (
              <th key={col} style={{ padding: 8, color: "#ccc" }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #333", color: "#eee" }}>
              <td style={{ padding: 8 }}>{o.orderId}</td>
              <td style={{ padding: 8 }}>{o.customer}</td>
              <td style={{ padding: 8 }}>{o.orderItem}</td>
              <td style={{ padding: 8 }}>{o.deliveryDate}</td>
              <td style={{ padding: 8 }}>${o.deliveryPricing}</td>
              <td style={{ padding: 8 }}>
                <span style={{
                  padding: "4px 8px",
                  borderRadius: 12,
                  backgroundColor:
                    o.status === "COMPLETED" ? "#065f46" :
                    o.status === "CANCELED" ? "#7f1d1d" :
                    o.status === "RESTITUTE" ? "#78350f" :
                    o.status === "CONTINUING" ? "#1e40af" : "#374151",
                  color: "#fff",
                  fontSize: 12
                }}>{o.status}</span>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: 12, color: "#ccc" }}>No orders found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button
          onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
          disabled={filters.page <= 0}
          style={{ padding: "8px 12px", backgroundColor: "#1f2937", color: "#fff", border: "none", borderRadius: 4 }}
        >
          Previous
        </button>
        <span>Page {filters.page + 1} of {totalPages}</span>
        <button
          onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
          disabled={filters.page + 1 >= totalPages}
          style={{ padding: "8px 12px", backgroundColor: "#1f2937", color: "#fff", border: "none", borderRadius: 4 }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderManagement;
