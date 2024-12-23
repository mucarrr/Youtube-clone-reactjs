import React from "react";
import { categories } from "../../utils/constants";
import { Link, useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const [params] = useSearchParams();
  const active = params.get("category");

  return (
    <aside className="ms-3 p-1 md:p-4">
      {categories.map((i, key) => (
        <Link key={key} to={i.path == "/" ? "/" : `?category=${i.path}`}>
          <div
            className="flex items-center gap-2 py-3 px-2 sm:px-3 md:text-lg cursor-pointer rounded-md hover:bg-[#2d2d2d] transition"
            style={{ background: active === i.path && "#242424" }}
          >
            <span className="max-md:text-2xl">{i.icon}</span>
            <span className="max-md:hidden truncate">{i.name}</span>
          </div>
          {i.divider && <hr className="border" />}
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
