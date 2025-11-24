import React from "react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: "dashboard-square-01" },
    { name: "Students", icon: "user-group", active: true },
    { name: "Courses", icon: "book-open-01" },
    { name: "Settings", icon: "settings-02" },
  ];

  return (
    <aside className="w-20 lg:w-64 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between transition-all duration-300">
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-zinc-900/50">
        <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center text-white shrink-0">
          <i className="hgi hgi-stroke hgi-mortarboard-01"></i>
        </div>
        <span className="hidden lg:block ml-3 font-semibold tracking-wide text-zinc-100">
          EduAdmin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 lg:px-4 flex flex-col gap-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 group
              ${
                item.active
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
              }`}
          >
            <i
              className={`hgi hgi-stroke hgi-${item.icon} text-xl ${
                item.active ? "text-white" : "group-hover:text-zinc-300"
              }`}
            ></i>
            <span className="hidden lg:block text-sm font-medium">
              {item.name}
            </span>

            {/* Active Indicator */}
            {item.active && (
              <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
            )}
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900 cursor-pointer transition-colors">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=3f3f46&color=fff"
            alt="User"
            className="w-8 h-8 rounded-full bg-zinc-800"
          />
          <div className="hidden lg:block overflow-hidden">
            <p className="text-sm font-medium text-zinc-200">Admin User</p>
            <p className="text-xs text-zinc-500 truncate">admin@system.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
