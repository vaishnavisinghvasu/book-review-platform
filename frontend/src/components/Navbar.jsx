
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2"
        >
          📚 BookReview
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
         

          {user ? (
            <>
              <span className="font-medium text-gray-800 dark:text-gray-100">
                {user.name}
              </span>
              <Link
                to="/add-book"
                className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Add Book
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-lg border border-gray-400 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2 bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-800">
          

          {user ? (
            <>
              <span className="block text-gray-800 dark:text-gray-100">{user.name}</span>
              <Link
                to="/add-book"
                className="block px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Add Book
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 rounded border text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
