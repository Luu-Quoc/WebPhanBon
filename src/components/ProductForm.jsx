import { useState } from "react";

import "./ProductForm.css"

function ProductForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    unit: "bao",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      alert("Vui lòng nhập đầy đủ tên, loại, giá và tồn kho");
      return;
    }

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

  return (
    <div className="form-box">
      <h2>Thêm sản phẩm</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Tên sản phẩm"
          value={formData.name}
          onChange={handleChange}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Chọn loại sản phẩm</option>
          <option value="organic_fertilizer">Phân hữu cơ</option>
          <option value="inorganic_fertilizer">Phân vô cơ</option>
          <option value="pesticide">Thuốc bảo vệ thực vật</option>
          <option value="seed">Hạt giống</option>
          <option value="tool">Dụng cụ nông nghiệp</option>
        </select>

        <input
          name="price"
          type="number"
          placeholder="Giá"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Tồn kho"
          value={formData.stock}
          onChange={handleChange}
        />

        <input
          name="unit"
          placeholder="Đơn vị"
          value={formData.unit}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Link ảnh tạm thời"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Mô tả"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Lưu sản phẩm
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;