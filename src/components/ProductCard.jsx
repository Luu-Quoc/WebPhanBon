function ProductCard({ product, onDelete, onDetail, onEdit, isAdmin }) {
  const categoryMap = {
    organic_fertilizer: "Phân hữu cơ",
    inorganic_fertilizer: "Phân vô cơ",
    pesticide: "Thuốc BVTV",
    seed: "Hạt giống",
    tool: "Dụng cụ",
  };

  return (
    <div className="product-card">
      <img
        src={product.image || "https://placehold.co/400x300?text=No+Image"}
        alt={product.name}
      />

      <div className="product-content">
        <h3>{product.name}</h3>

        <p>
          <strong>Loại:</strong>{" "}
          {categoryMap[product.category] || product.category}
        </p>

        <p>
          <strong>Giá:</strong> {product.price?.toLocaleString("vi-VN")} đ
        </p>

        <p>
          <strong>Tồn kho:</strong> {product.stock} {product.unit}
        </p>

        {product.stock <= 5 ? (
          <span className="low-stock">Sắp hết hàng</span>
        ) : (
          <span className="in-stock">Còn hàng</span>
        )}

        <div className="product-actions">
          <button className="detail-btn" onClick={() => onDetail(product._id)}>
            Chi tiết
          </button>

          {isAdmin && (
            <>
              <button className="edit-btn" onClick={() => onEdit(product)}>
                Sửa
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(product._id)}
              >
                Xóa
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
