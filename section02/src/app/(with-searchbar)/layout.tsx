import { ReactNode } from "react";
import Searchbar from "@/app/components/Searchbar";

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Searchbar />
      <hr />
      {children}
    </div>
  );
}
