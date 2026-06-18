import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getOrderById } from "../services/orderService";

function OrderDetailPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const response = await getOrderById(id);

      setOrder(response.data);
    } catch (error) {
      console.log(error);
      alert("Không tải được đơn hàng");
    }
  };

  if (!order) {
    return <p>Đang tải đơn hàng...</p>;
  }

  return (
    <div className="order-detail-page">
      <button className="back-btn" onClick={() => navigate("/debts")}>
        ← Quay lại
      </button>

      <h2>Chi tiết đơn hàng</h2>

      <div className="card-box">
        <p>
          <strong>Khách hàng:</strong> {order.customerName}
        </p>

        <p>
          <strong>Ngày tạo:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString("vi-VN")}
        </p>

        <p>
          <strong>Tổng tiền:</strong>{" "}
          {order.totalAmount.toLocaleString("vi-VN")}đ
        </p>

        <p>
          <strong>Đã thanh toán:</strong>{" "}
          {order.paidAmount.toLocaleString("vi-VN")}đ
        </p>

        <p>
          <strong>Còn nợ:</strong>{" "}
          <span className="text-danger fw-bold">
            {order.debtAmount.toLocaleString("vi-VN")}đ
          </span>
        </p>

        <p>
          <strong>Ghi chú:</strong> {order.note || "Không có"}
        </p>
      </div>

      <div className="card-box mt-3">
        <h4>Danh sách sản phẩm</h4>

        <table className="table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>SL</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>

                <td>{item.quantity}</td>

                <td>{item.price.toLocaleString("vi-VN")}đ</td>

                <td>{item.total.toLocaleString("vi-VN")}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderDetailPage;
