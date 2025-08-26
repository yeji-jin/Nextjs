"use client"; //서버,클라이언트 모 어떤 환경에서 발생해도 두 대응하기위해 선언 필수
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다</h3>
      <button
        onClick={() => {
          startTransition(() => {
            // router.refresh 는 비동기적으로 동작하는 메서드 -> refresh가 끝나기 전에, reset이 실행 될 수 있음 -> 새로운 서버 컴포넌트의 결과 없이 화면을 새로 그리기 때문에 오류 해결 X
            // -> 동기적으로 동작이 필요
            // -> startTransition는 하나의 콜백함수를 전달받아, 콜백함수 안에 들어있는 UI를 변경시키는 작업들을 모두 일괄적으로 처리
            // -> 이 두 작업이 "한 덩어리 transition 업데이트" 로 묶여서 실행됩니다. (=순서대로 실행됨)
            router.refresh(); //현재 페이지에 필요한 서버 컴포넌트만 다시 불러옴(=업데이트)(next서버측에 재실행 요청)
            reset(); //에러상태를 초기화하고 컴포넌트를 재랜더링
          });
        }}
      >
        다시시도
      </button>
    </div>
  );
}
// reset 메서드 -> 브라우저 측에서 서버로부터 전달받은 데이터를 이용해서 화면을 다시 한번 렌더링 해보는 메서드
// 클라이언트 컴포넌트 내부에서 발생한 에러만 복구 가능
// 서버컴포넌트 오류 해결방법
// 1. window.location.reload() -> 새로고침을 통한 재로딩
// 2. router.refresh() -> next서버에게 서버컴포넌트만 새롭게 렌더링요청 -> reset호출
/*
    onClick={() => {
      router.refresh(); //현재 페이지에 필요한 서버 컴포넌트만 다시 불러옴(=업데이트)(next서버측에 재실행 요청)
      reset(); //에러상태를 초기화하고 컴포넌트를 재랜더링
    }}
*/
