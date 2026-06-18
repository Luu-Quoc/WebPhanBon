import { NavLink } from "react-router-dom";

function Sidebar() {

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;
  return (
    <aside className="sidebar">
      <h3 className="logo">🌱 Phân Bón AI</h3>

      <nav>
        {isAdmin && (
        <NavLink to="/dashboard" className="menu-item">
          📊 Tổng quan
        </NavLink>
      )}

        <NavLink to="/products" className="menu-item">
          📦 Sản phẩm
        </NavLink>

        <NavLink to="/customers" className="menu-item">
          👨‍🌾 Khách hàng
        </NavLink>

        <NavLink to="/orders" className="menu-item">
          🧾 Bán hàng
        </NavLink>

        <NavLink to="/debts" className="menu-item">
          💰 Công nợ
        </NavLink>

        <NavLink to="/ai" className="menu-item">
          🤖 Trợ lý AI
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;