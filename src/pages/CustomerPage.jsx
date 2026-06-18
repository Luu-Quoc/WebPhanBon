import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import CustomerForm from "../components/CustomerForm";
import "./CustomerPage.css"

import {
  getCustomers,
  createCustomer,
  deleteCustomer,
} from "../services/customerService";

import "./CustomerPage.css";

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [showForm, setShowForm] = useState(false);

  const searchRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;

  useEffect(() => {
    // document.title = "Quản lý khách hàng - Phân Bón AI";
    loadCustomers();
    searchRef.current?.focus();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
      alert("Không tải được danh sách khách hàng");
    }
  };

  const handleCreateCustomer = async (data) => {
    try {
      const token = localStorage.getItem("access_token");

      await createCustomer(data, token);
      await loadCustomers();

      setShowForm(false);
      alert("Thêm khách hàng thành công");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Thêm khách hàng thất bại");
    }
  };

  const handleDeleteCustomer = useCallback(async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa khách hàng này không?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access_token");

      await deleteCustomer(id, token);
      await loadCustomers();

      alert("Xóa khách hàng thành công");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Xóa khách hàng thất bại");
    }
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter((item) => {
      const text = `${item.name} ${item.phone} ${item.address} ${item.cropType}`;
      return text.toLowerCase().includes(keyword.toLowerCase());
    });
  }, [customers, keyword]);

  return (
    <div className="customer-page">
      <div className="customer-header">
        <h2>Quản lý khách hàng</h2>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Thêm khách hàng
        </button>
      </div>

      {showForm && (
        <CustomerForm
          onSubmit={handleCreateCustomer}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="customer-search">
        <input
          ref={searchRef}
          placeholder="Tìm theo tên, SĐT, địa chỉ, cây trồng..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="customer-table-box">
        <table>
          <thead>
            <tr>
              <th>Tên khách</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th>Cây trồng</th>
              <th>Diện tích</th>
              <th>Công nợ</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.cropType}</td>
                <td>{item.area}</td>
                <td>{item.totalDebt?.toLocaleString("vi-VN")}đ</td>
                <td>
                  <button className="detail-btn">Chi tiết</button>

                  {isAdmin && (
                    <>
                      <button className="edit-btn">Sửa</button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteCustomer(item._id)}
                      >
                        Xóa
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length === 0 && (
        <p className="empty-text">Không tìm thấy khách hàng nào</p>
      )}
    </div>
  );
}

export default CustomerPage;