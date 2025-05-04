import { useState } from "react";
import { Link } from "react-router-dom";
import "./Layout.scss";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`layout ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <aside className="sidebar">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? "⬅" : "➡"}
        </button>
        <div className="sidebar-content">
          <h2 className="logo">dailyQ</h2>
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/review">전체 리뷰</Link>
            </li>
            <li>
              <Link to="/bookmarks">북마크</Link>
            </li>
            <li>
              <Link to="/hidden">숨긴 질문 보기</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
