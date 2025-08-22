"use stric";

import { ReactNode } from "react";

export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log("ClientComponent");
  return (
    <div style={{ padding: "20px", border: "4px solid red" }}>
      <div>client-component</div>
      {children}
    </div>
  );
}
