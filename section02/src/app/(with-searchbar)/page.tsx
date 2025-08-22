import styles from "./page.module.css";
import ClientComponent from "@/app/components/client-component";
import ServerComponent from "@/app/components/sever-component";

export default function Home() {
  return (
    <div style={{ padding: "20px", border: "4px solid green" }}>
      <div className={styles.page}>index home</div>
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
