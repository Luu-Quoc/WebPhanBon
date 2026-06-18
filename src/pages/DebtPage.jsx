function DebtPage() {
  const debts = [
    {
      id: 1,
      customer: "Chú Ba",
      amount: 800000,
      dueDate: "25/06/2026",
      status: "Chưa trả",
    },
    {
      id: 2,
      customer: "Anh Tư",
      amount: 1500000,
      dueDate: "20/06/2026",
      status: "Quá hạn",
    },
  ];

  return (
    <div>
      <h2 className="page-title">Quản lý công nợ</h2>

      <div className="card-box">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Số tiền nợ</th>
              <th>Ngày hẹn trả</th>
              <th>Trạng thái</th>
              <th>AI hỗ trợ</th>
            </tr>
          </thead>

          <tbody>
            {debts.map((item) => (
              <tr key={item.id}>
                <td>{item.customer}</td>
                <td>{item.amount.toLocaleString("vi-VN")}đ</td>
                <td>{item.dueDate}</td>
                <td>
                  <span
                    className={
                      item.status === "Quá hạn"
                        ? "badge bg-danger"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {item.status}
                  </span>
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
      </div>
    </div>
  );
}

export default DebtPage;