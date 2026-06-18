import { useEffect, useMemo, useState } from "react";

import { getCustomers } from "../services/customerService";
import { getProducts } from "../services/productService";
import { createOrder, getOrders } from "../services/orderService";

import "./OrderPage.css";

function OrderPage() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [customerId, setCustomerId] = useState(
    localStorage.getItem("order-customer") || "",
  );

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [paidAmount, setPaidAmount] = useState(
    localStorage.getItem("order-paid") || "",
  );

  const [note, setNote] = useState(localStorage.getItem("order-note") || "");

  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("order-items")) || [];
  });

  const formatMoneyInput = (value) => {
    const number = String(value || "").replace(/\D/g, "");

    if (!number) return "";

    return Number(number).toLocaleString("vi-VN");
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem("order-items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("order-customer", customerId);
  }, [customerId]);

  useEffect(() => {
    localStorage.setItem("order-paid", paidAmount);
  }, [paidAmount]);

  useEffect(() => {
    localStorage.setItem("order-note", note);
  }, [note]);

  const loadData = async () => {
    try {
      const customerRes = await getCustomers();
      const productRes = await getProducts();
      const orderRes = await getOrders();

      setCustomers(customerRes.data);
      setProducts(productRes.data);
      setOrders(orderRes.data);
    } catch (error) {
      console.log(error);
      alert("Không tải được dữ liệu bán hàng");
    }
  };

  const selectedProduct = products.find((item) => item._id === productId);

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }, [items]);

  const paidValue = Number(paidAmount || 0);

  const debtAmount = totalAmount - paidValue;

  const changeAmount = paidValue > totalAmount ? paidValue - totalAmount : 0;

  const handleAddItem = () => {
    if (!productId || !selectedProduct || quantity <= 0) {
      alert("Vui lòng chọn sản phẩm và số lượng");
      return;
    }

    const existingItem = items.find((item) => item.productId === productId);

    const currentQuantity = existingItem ? existingItem.quantity : 0;

    const newQuantity = currentQuantity + Number(quantity);

    if (selectedProduct.stock < newQuantity) {
      alert(
        `Sản phẩm ${selectedProduct.name} không đủ tồn kho. Hiện còn ${selectedProduct.stock}`,
      );
      return;
    }

    if (existingItem) {
      setItems(
        items.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item,
        ),
      );
    } else {
      setItems([
        ...items,
        {
          productId: selectedProduct._id,
          productName: selectedProduct.name,
          price: selectedProduct.price,
          quantity: Number(quantity),
        },
      ]);
    }

    setProductId("");
    setQuantity(1);
  };

  const handleRemoveItem = (productId) => {
    setItems(items.filter((item) => item.productId !== productId));
  };

  const clearDraftOrder = () => {
    localStorage.removeItem("order-items");
    localStorage.removeItem("order-customer");
    localStorage.removeItem("order-paid");
    localStorage.removeItem("order-note");
  };

  const resetOrderForm = () => {
    setCustomerId("");
    setProductId("");
    setQuantity(1);
    setPaidAmount("");
    setNote("");
    setItems([]);
    clearDraftOrder();
  };

  const handleCreateOrder = async () => {
    try {
      if (!customerId) {
        alert("Vui lòng chọn khách hàng");
        return;
      }

      if (items.length === 0) {
        alert("Vui lòng thêm sản phẩm vào đơn");
        return;
      }

      const token = localStorage.getItem("access_token");

      const orderData = {
        customerId,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        paidAmount: paidValue > totalAmount ? totalAmount : paidValue,
        note,
      };

      await createOrder(orderData, token);

      if (changeAmount > 0) {
        alert(
          `Tạo đơn hàng thành công. Tiền thối lại: ${changeAmount.toLocaleString(
            "vi-VN",
          )}đ`,
        );
      } else {
        alert("Tạo đơn hàng thành công");
      }

      resetOrderForm();

      await loadData();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Tạo đơn hàng thất bại");
    }
  };

  return (
    <div className="order-page">
      <h2 className="page-title">Tạo đơn bán hàng</h2>

      <div className="card-box">
        <div className="order-form">
          <div>
            <label>Khách hàng</label>

            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            >
              <option value="">Chọn khách hàng</option>

              {customers.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} - {item.phone}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Sản phẩm</label>

            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            >
              <option value="">Chọn sản phẩm</option>

              {products.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} - Tồn: {item.stock}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Số lượng</label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <button className="add-item-btn" onClick={handleAddItem}>
            + Thêm vào đơn
          </button>
        </div>
      </div>

      <div className="card-box">
        <h3>Sản phẩm trong đơn</h3>

        {items.length === 0 ? (
          <p>Chưa có sản phẩm nào</p>
        ) : (
          <table className="order-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productName}</td>
                  <td>{item.price.toLocaleString("vi-VN")}đ</td>
                  <td>{item.quantity}</td>
                  <td>
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="order-summary">
          <p>
            Tổng tiền: <strong>{totalAmount.toLocaleString("vi-VN")}đ</strong>
          </p>

          <label>Khách đã trả</label>

          <input
            type="text"
            value={formatMoneyInput(paidAmount)}
            onChange={(e) => setPaidAmount(e.target.value.replace(/\D/g, ""))}
            placeholder="Nhập số tiền đã trả"
          />

          {debtAmount > 0 ? (
            <p>
              Còn nợ:{" "}
              <strong className="debt-text">
                {debtAmount.toLocaleString("vi-VN")}đ
              </strong>
            </p>
          ) : changeAmount > 0 ? (
            <p>
              Tiền thối lại:{" "}
              <strong className="change-text">
                {changeAmount.toLocaleString("vi-VN")}đ
              </strong>
            </p>
          ) : (
            <p>
              Còn nợ: <strong>0đ</strong>
            </p>
          )}

          <textarea
            placeholder="Ghi chú đơn hàng"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button className="save-order-btn" onClick={handleCreateOrder}>
            Tạo đơn hàng
          </button>

          {items.length > 0 && (
            <button className="clear-order-btn" onClick={resetOrderForm}>
              Xóa đơn đang nhập
            </button>
          )}
        </div>
      </div>

      <div className="card-box">
        <h3>Lịch sử đơn hàng</h3>

        {orders.length === 0 ? (
          <p>Chưa có đơn hàng nào</p>
        ) : (
          <table className="order-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Tổng tiền</th>
                <th>Đã trả</th>
                <th>Còn nợ</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.customerName}</td>

                  <td>{order.totalAmount?.toLocaleString("vi-VN")}đ</td>

                  <td>{order.paidAmount?.toLocaleString("vi-VN")}đ</td>

                  <td>{order.debtAmount?.toLocaleString("vi-VN")}đ</td>

                  <td>
                    {order.status === "paid" ? "Đã thanh toán" : "Còn nợ"}
                  </td>

                  <td>{new Date(order.createdAt).toLocaleString("vi-VN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
