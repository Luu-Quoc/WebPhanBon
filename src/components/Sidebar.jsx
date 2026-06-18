import { NavLink } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.isAdmin;

  return (
    <aside className="sidebar">
      <div>
        <h3 className="logo">
          🌱 <span>Thanh Phân</span>
        </h3>

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
      </div>

      <div className="sidebar-footer">
        <div className="user-box">
          <div className="avatar">👤</div>

          <div>
            <p>{user?.name || "Người dùng"}</p>

            <span>{isAdmin ? "Quản trị viên" : "Nhân viên"}</span>
          </div>
        </div>

        <small>Phân Bón Hoan Van v1.0</small>
      </div>
    </aside>
  );
}

export default Sidebar;
