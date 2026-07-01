import { useState, useEffect } from "react";

import "./ProductForm.css";

function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    unit: "bao",
    description: "",
    // image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        unit: product.unit || "bao",
        description: product.description || "",
        image: product.image || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        unit: "bao",
        description: "",
        image: "",
      });

      setImageFile(null);
    }
  }, [product]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      alert("Vui lòng nhập đầy đủ tên, loại, giá và tồn kho");
      return;
    }

    onSubmit({
      ...formData,
      imageFile,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

  return (
    <div className="form-box">
      <h2>{product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h2>

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

        <label>Ảnh sản phẩm</label>
        {product?.image && (
          <img
            src={product.image}
            alt={product.name}
            className="preview-image"
          />
        )}

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageFile && (
          <p className="selected-image">Đã chọn: {imageFile.name}</p>
        )}

        <textarea
          name="description"
          placeholder="Mô tả"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="form-actions">
          <button type="submit" className="save-btn">
            {product ? "Cập nhật" : "Lưu sản phẩm"}
          </button>

          <button type="button" className="cancel-btn" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
