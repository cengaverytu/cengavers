// src/components/layout/Navbar.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser, useSignOut } from "../../features/auth/hooks/useAuth";
import { isAdmin } from "../../features/auth/utils/isAdmin"; // <-- EKLEDİK

export default function Navbar() {
  const navigate = useNavigate();
  const { data: me, isLoading } = useAuthUser();
  const signOut = useSignOut();
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    signOut.mutate(undefined, { onSuccess: () => navigate("/", { replace: true }) });
  };

  return (
    <header className="border-b">
      <nav className="w-full flex items-center min-h-[72px] px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="cursor-pointer font-bold text-2xl md:text-3xl" onClick={() => navigate("/")}>
            ClubManagement
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-gray-100"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 ml-auto">
          {isLoading ? (
            <div className="w-24 h-6 bg-gray-300 animate-pulse rounded" />
          ) : me ? (
            <>
              {/* SADECE ADMIN’E GÖRÜNÜR */}
              {isAdmin(me) && (
                <button
                  onClick={() => navigate("/admin")}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black"
                >
                  Admin Panel
                </button>
              )}

              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Dashboard
              </button>

              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="hover:underline">
                Login
              </button>
              <button onClick={() => navigate("/register")} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menü */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        } border-t`}
      >
        <div className="px-4 sm:px-6 py-3 flex flex-col gap-3">
          {isLoading ? (
            <div className="w-24 h-6 bg-gray-300 animate-pulse rounded" />
          ) : me ? (
            <>
              {/* SADECE ADMIN’E GÖRÜNÜR */}
              {isAdmin(me) && (
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/admin");
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
                >
                  Admin Panel
                </button>
              )}

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/dashboard");
                }}
                className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Dashboard
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  handleSignOut();
                }}
                className="w-full text-left px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/register");
                }}
                className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
