import React from "react";

export const TabContext = React.createContext();

const Tabs = ({ labels, children }) => {
  const [currentTab, setCurrentTab] = React.useState(labels[0]);

  return (
    <TabContext.Provider value={currentTab}>
      <ul role="tablist">
        {labels.map((label) => (
          <li key={label}>
            <button
              role="tab"
              aria-selected={label === currentTab}
              onClick={() => setCurrentTab(label)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      {children}
    </TabContext.Provider>
  );
};

export default Tabs;
