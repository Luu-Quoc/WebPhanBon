import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getCustomerById } from "../services/customerService";
import { getOrdersByCustomer } from "../services/orderService";
import "./CustomerDetailPage.css";

function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadCustomerDetail();
    loadOrdersByCustomer();
  }, [id]);

  const loadOrdersByCustomer = async () => {
    try {
      const response = await getOrdersByCustomer(id);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
      alert("Không tải được lịch sử mua hàng");
    }
  };

  const loadCustomerDetail = async () => {
    try {
      const response = await getCustomerById(id);

      setCustomer(response.data);
    } catch (error) {
      console.log(error);
      alert("Không tải được chi tiết khách hàng");
    }
  };

  if (!customer) {
    return <p>Đang tải thông tin khách hàng...</p>;
  }

  return (
    <div className="customer-detail-page">
      <button className="back-btn" onClick={() => navigate("/customers")}>
        ← Quay lại
      </button>

      <h2>Chi tiết khách hàng</h2>

      <div className="customer-detail-card">
        <h3>{customer.name}</h3>

        <p>
          <strong>Số điện thoại:</strong> {customer.phone}
        </p>

        <p>
          <strong>Địa chỉ:</strong> {customer.address || "Chưa có"}
        </p>

        <p>
          <strong>Công nợ:</strong>
          <span className="debt-text">
            {(customer.totalDebt || 0).toLocaleString("vi-VN")}đ
          </span>
        </p>

        <p>
          <strong>Ghi chú:</strong> {customer.note || "Không có"}
        </p>
      </div>

      <div className="customer-detail-section">
        <h3>Lịch sử mua hàng</h3>

        {orders.length === 0 ? (
          <p>Khách hàng này chưa có đơn hàng nào.</p>
        ) : (
          <table className="detail-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Đã trả</th>
                <th>Còn nợ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </td>

                  <td>
                    {order.items.map((item) => (
                      <div key={item.productId}>
                        {item.productName} x {item.quantity}
                      </div>
                    ))}
                  </td>

                  <td>{order.totalAmount.toLocaleString("vi-VN")}đ</td>

                  <td>{order.paidAmount.toLocaleString("vi-VN")}đ</td>

                  <td className="debt-text">
                    {order.debtAmount.toLocaleString("vi-VN")}đ
                  </td>

                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="customer-detail-section">
        <h3>Công nợ chi tiết</h3>

        {orders.filter((order) => order.debtAmount > 0).length === 0 ? (
          <p>Khách hàng không còn công nợ.</p>
        ) : (
          <table className="detail-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Đơn hàng</th>
                <th>Tổng tiền</th>
                <th>Đã trả</th>
                <th>Còn nợ</th>
              </tr>
            </thead>

            <tbody>
              {orders
                .filter((order) => order.debtAmount > 0)
                .map((order) => (
                  <tr key={order._id}>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </td>

                    <td>{order._id.slice(-6).toUpperCase()}</td>

                    <td>{order.totalAmount.toLocaleString("vi-VN")}đ</td>

                    <td>{order.paidAmount.toLocaleString("vi-VN")}đ</td>

                    <td className="debt-text">
                      {order.debtAmount.toLocaleString("vi-VN")}đ
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CustomerDetailPage;
