import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDebtOrders } from "../services/orderService";

function DebtPage() {
  const [debts, setDebts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadDebts();
  }, []);

  const loadDebts = async () => {
    try {
      const response = await getDebtOrders();
      setDebts(response.data);
    } catch (error) {
      console.log(error);
      alert("Không tải được danh sách công nợ");
    }
  };

  return (
    <div>
      <h2 className="page-title">Quản lý công nợ</h2>

      <div className="card-box">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Ngày mua</th>
              <th>Tổng tiền</th>
              <th>Đã trả</th>
              <th>Còn nợ</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
              <th>AI hỗ trợ</th>
            </tr>
          </thead>

          <tbody>
            {debts.map((item) => (
              <tr key={item._id}>
                <td>{item.customerName}</td>

                <td>{new Date(item.createdAt).toLocaleDateString("vi-VN")}</td>

                <td>{item.totalAmount.toLocaleString("vi-VN")}đ</td>

                <td>{item.paidAmount.toLocaleString("vi-VN")}đ</td>

                <td className="text-danger fw-bold">
                  {item.debtAmount.toLocaleString("vi-VN")}đ
                </td>

                <td>
                  <span className="badge bg-warning text-dark">Chưa trả</span>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/orders/${item._id}`)}
                  >
                    Chi tiết
                  </button>
                </td>

                <td>
                  <button className="btn btn-sm btn-success">
                    Tạo tin nhắn nhắc nợ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {debts.length === 0 && (
          <p style={{ textAlign: "center", marginTop: 16 }}>
            Hiện chưa có công nợ nào
          </p>
        )}
      </div>
    </div>
  );
}

export default DebtPage;
