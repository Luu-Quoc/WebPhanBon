import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";

import {
  getProducts,
  deleteProduct,
  createProduct,
} from "../services/productService";

import "./ProductPage.css";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const searchInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;

  const categories = [
    { value: "all", label: "Tất cả" },
    { value: "organic_fertilizer", label: "Phân hữu cơ" },
    { value: "inorganic_fertilizer", label: "Phân vô cơ" },
    { value: "pesticide", label: "Thuốc BVTV" },
    { value: "seed", label: "Hạt giống" },
    { value: "tool", label: "Dụng cụ" },
  ];

  useEffect(() => {
    document.title = "Quản lý sản phẩm - Phân Bón AI";
    loadProducts();
    searchInputRef.current?.focus();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      alert("Không tải được danh sách sản phẩm");
    }
  };

  const handleCreateProduct = async (data) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("Bạn cần đăng nhập trước");
        return;
      }

      await createProduct(data, token);
      await loadProducts();

      setShowForm(false);
      alert("Thêm sản phẩm thành công");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Thêm sản phẩm thất bại");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchKeyword = item.name
        ?.toLowerCase()
        .includes(keyword.toLowerCase());

      const matchCategory =
        category === "all" || item.category === category;

      return matchKeyword && matchCategory;
    });
  }, [products, keyword, category]);

  const handleDelete = useCallback(async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa sản phẩm này không?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("Bạn cần đăng nhập trước");
        return;
      }

      await deleteProduct(id, token);
      await loadProducts();

      alert("Xóa sản phẩm thành công");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Xóa sản phẩm thất bại");
    }
  }, []);

  return (
    <div className="product-page">
      <div className="product-header">
        <h1>Quản lý sản phẩm</h1>

        {isAdmin && (
          <button
            className="add-btn"
            onClick={() => setShowForm(true)}
          >
            + Thêm sản phẩm
          </button>
        )}
      </div>

      {showForm && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="search-box">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="category-filter">
        {categories.map((item) => (
          <button
            key={item.value}
            className={
              category === item.value
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() => setCategory(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
            onDelete={handleDelete}
            isAdmin={isAdmin}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="empty-text">Không tìm thấy sản phẩm nào</p>
      )}
    </div>
  );
}

export default ProductPage;