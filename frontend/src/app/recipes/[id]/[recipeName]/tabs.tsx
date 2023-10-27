interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const defaultTabAClasses = "group flex items-center justify-center p-4 rounded-t-lg border-b-2";
  const activeTabAClasses = "text-orange-600 border-orange-600";
  const inactiveTabAClasses = "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";

  const defaultTabSvgClasses = "w-5 h-5 mr-2";
  const activeTabSvgClasses = "text-orange-600 dark:text-orange-500";
  const inactiveTabSvgClasses = "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300";

  return (
    <ul className="sticky top-0 bg-white flex border-b border-gray-200 dark:border-gray-700z -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li className="flex-1">
        <a
          href="#"
          className={`${defaultTabAClasses} ${activeTab === "ingredients" ? activeTabAClasses : inactiveTabAClasses}`}
          onClick={() => setActiveTab("ingredients")}
        >
          <svg
            className={`${defaultTabSvgClasses} ${activeTab === "ingredients" ? activeTabSvgClasses : inactiveTabSvgClasses}`}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ContentPasteIcon"
            fill="currentColor"
          >
            <path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path>
          </svg>
          Ingredients
        </a>
      </li>
      <li className="flex-1">
        <a
          href="#"
          className={`${defaultTabAClasses} ${activeTab === "instructions" ? activeTabAClasses : inactiveTabAClasses}`}
          aria-current="page"
          onClick={() => setActiveTab("instructions")}
        >
          <svg
            className={`${defaultTabSvgClasses} ${activeTab === "instructions" ? activeTabSvgClasses : inactiveTabSvgClasses}`}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            data-testid="FormatListNumberedIcon"
          >
            <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"></path>
          </svg>
          Recipe
        </a>
      </li>
    </ul>
  );
}
