import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="border-gray-200 bg-sky-500">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-1">
        <a href="/" className="mr-auto flex items-center">
          <Image
            src="/rick_and_morty.png"
            className="h-40"
            alt="Rick and Morty Logo"
            width={160}
            height={40}
          />
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex-col border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:border-0 md:bg-sky-500 md:p-0 rtl:space-x-reverse ">
            <li></li>
            <li>
              <a
                href="/favorites"
                className="block rounded px-5 py-5 text-yellow-100 md:p-20 md:dark:hover:text-sky-500"
              >
                Favorites
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
