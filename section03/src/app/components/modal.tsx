"use client";
import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    // 초기 모달 on
    if (!dialogRef.current?.open) {
      //모달이 꺼져있다면
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if ((e.target as any).nodeName === "DIALOG") {
          //모달의 배경클릭시 뒤로가기
          router.back();
        }
      }}
      onClose={() => {
        //esc key
        router.back();
      }}
      className={style.modal}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
