import { useState } from "react";

function CustomerForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    cropType: "",
    area: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Vui lòng nhập tên và số điện thoại");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="customer-form-box">
      <h3>Thêm khách hàng</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Tên khách hàng"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Địa chỉ"
          value={formData.address}
          onChange={handleChange}
        />

        <select
          name="cropType"
          value={formData.cropType}
          onChange={handleChange}
        >
          <option value="">Chọn cây trồng</option>
          <option value="Lúa">Lúa</option>
          <option value="Cây ăn trái">Cây ăn trái</option>
          <option value="Rau màu">Rau màu</option>
          <option value="Cà phê">Cà phê</option>
          <option value="Hồ tiêu">Hồ tiêu</option>
          <option value="Khác">Khác</option>
        </select>

        <input
          name="area"
          placeholder="Diện tích canh tác, ví dụ: 2 công"
          value={formData.area}
          onChange={handleChange}
        />

        <textarea
          name="note"
          placeholder="Ghi chú"
          value={formData.note}
          onChange={handleChange}
        />

        <div className="customer-form-actions">
          <button type="submit" className="save-btn">
            Lưu khách hàng
          </button>

          <button type="button" className="cancel-btn" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerForm;