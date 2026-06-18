import { useNavigate } from "react-router-dom";
// import "./Header.css"
function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="header">
      <div>
        <h3>
          Xin chào, {user?.name}
        </h3>

        <p>
          Vai trò:
          {user?.isAdmin
            ? " Admin"
            : " Nhân viên"}
        </p>
      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default Header;