import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const { pathname } = router;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const active =
    "text-orange-400 transition hover:text-orange-500/75 p-3 rounded-md bg-gray-200";
  const inActive = "text-gray-500 transition hover:text-gray-500/75 p-3";

  return (
    <>
      <header className="sticky top-0 z-30 mx-auto bg-white border-b border-zinc-200">
        <div className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link
                className="flex items-center gap-2 font-bold text-orange-600 "
                href="/"
              >
                <span className="sr-only">Home</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                </svg>
                ElectroGet
              </Link>
            </div>
            <div className="md:flex md:items-center md:gap-8">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-3 text-lg">
                  <li>
                    <Link
                      className={pathname === "/" ? active : inActive}
                      href="/"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={pathname === "/products" ? active : inActive}
                      href="/products"
                    >
                      Products
                    </Link>
                  </li>

                  {/* <li>
                    <Link
                      className={pathname === "/categories" ? active : inActive}
                      href="/categories"
                    >
                      Categories
                    </Link>
                  </li> */}

                  <li>
                    <Link
                      className={pathname === "/orders" ? active : inActive}
                      href="/orders"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={pathname === "/users-query" ? active : inActive}
                      href="/users-query"
                    >
                      User Queries
                    </Link>
                  </li>

                  {/* <li>
                    <Link
                      className={pathname === "/settings" ? active : inActive}
                      href="/settings"
                    >
                      Settings
                    </Link>
                  </li> */}
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                {/* <div className="sm:flex sm:gap-4">
                  <div className="w-10 h-10">
                    <Image
                      className="object-contain object-center w-full h-full rounded-full"
                      src={session.user.image}
                      alt={session.user.email}
                      width={34}
                      height={34}
                    />
                  </div>
                </div> */}

                {/* Mobile navigation button */}
                <div className="block md:hidden">
                  <button
                    onClick={toggleMobileNav}
                    className="p-2 text-gray-600 transition bg-gray-100 rounded hover:text-gray-600/75"
                  >
                    {isMobileNavOpen ? (
                      // X icon for close
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      // Menu icon for open
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Mobile navigation links */}
                {isMobileNavOpen && (
                  <div className="absolute right-0 p-6 text-lg bg-white border rounded shadow-lg md:hidden top-16 border-zinc-200">
                    <ul className="flex flex-col items-start gap-4">
                      <li>
                        <Link
                          onClick={toggleMobileNav}
                          className={pathname === "/" ? active : inActive}
                          href="/"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={toggleMobileNav}
                          className={
                            pathname === "/products" ? active : inActive
                          }
                          href="/products"
                        >
                          Products
                        </Link>
                      </li>

                      <li>
                        <Link
                          onClick={toggleMobileNav}
                          className={
                            pathname === "/categories" ? active : inActive
                          }
                          href="/categories"
                        >
                          Categories
                        </Link>
                      </li>

                      <li>
                        <Link
                          onClick={toggleMobileNav}
                          className={pathname === "/orders" ? active : inActive}
                          href="/orders"
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={toggleMobileNav}
                          className={pathname === "/users-query" ? active : inActive}
                          href="/users-query"
                        >
                          User Queries
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          onClick={toggleMobileNav}
                          className={
                            pathname === "/settings" ? active : inActive
                          }
                          href="/settings"
                        >
                          Settings
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
