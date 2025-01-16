"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import pictron from '../../public/pictron-images/pictron.png'

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const [showAdmin,setShowAdmin] = useState(true);
  const pathname = usePathname();
  const hideHeaderRoutes = ["/login", "/register"]; // Routes without a header
  const showHeader = !hideHeaderRoutes.includes(pathname);
  console.log("showHeader:: ",showHeader)

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    showHeader ? (
      <div className="navbar bg-black sticky top-0 z-40">
      <div className="container mx-auto">
        <div className="flex-1 px-2 lg:flex-none">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold"
            prefetch={true}
            onClick={() => showNotification("Welcome to ImageKit Shop", "info")}
          >
            <Image
            src={pictron}
            width={100}
            height={100}
            alt="Picture of the author"
          />
          </Link>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch gap-2">
            <div className="dropdown dropdown-end">
              
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <User className="w-5 h-5 text-white" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
              >
                {session ? (
                  <>
                    <li className="px-4 py-1">
                      <span className="text-sm opacity-70">
                        {session.user?.email?.split("@")[0]}
                      </span>
                    </li>
                    <div className="divider my-1"></div>
                    {session.user?.role === "admin" && (
                      <li>
                        <Link
                          href="/admin"
                          className="px-4 py-2 hover:bg-base-200 block w-full"
                          onClick={() =>
                            showNotification(
                              "Welcome to Admin Dashboard",
                              "info"
                            )
                          }
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        href="/orders"
                        className="px-4 py-2 hover:bg-base-200 block w-full"
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="px-4 py-2 hover:bg-base-200 block w-full"
                      onClick={() =>
                        showNotification("Please sign in to continue", "info")
                      }
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    ):(null)
   
  );
}
