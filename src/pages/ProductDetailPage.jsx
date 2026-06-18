import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProductById } from "../services/productService";

import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const categoryMap = {
    organic_fertilizer: "Phân hữu cơ",
    inorganic_fertilizer: "Phân vô cơ",
    pesticide: "Thuốc BVTV",
    seed: "Hạt giống",
    tool: "Dụng cụ",
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
      alert("Không tải được chi tiết sản phẩm");
    }
  };

  if (!product) {
    return <p>Đang tải sản phẩm...</p>;
  }

  return (
    <div className="product-detail-page">
      <button className="back-btn" onClick={() => navigate("/products")}>
        ← Quay lại
      </button>

      <h2>Chi tiết sản phẩm</h2>

      <div className="product-detail-card">
        <div className="product-detail-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="no-image">{product.name}</div>
          )}
        </div>

        <div className="product-detail-info">
          <h3>{product.name}</h3>

          <p>
            <strong>Loại:</strong>{" "}
            {categoryMap[product.category] || product.category}
          </p>

          <p>
            <strong>Giá bán:</strong> {product.price?.toLocaleString("vi-VN")}đ
          </p>

          <p>
            <strong>Tồn kho:</strong> {product.stock} {product.unit}
          </p>

          <p>
            <strong>Mô tả:</strong> {product.description || "Chưa có mô tả"}
          </p>

          <div>
            <strong>Phù hợp cho:</strong>

            <div className="suitable-list">
              {product.suitableFor?.length > 0 ? (
                product.suitableFor.map((item) => (
                  <span key={item}>{item}</span>
                ))
              ) : (
                <p>Chưa có thông tin</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
