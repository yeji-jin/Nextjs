import BookPage from "@/book/[...id]/page";
import Modal from "@/components/modal";

export default function page(props: any) {
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
    // 모달이 open 되어있을때 뒷배경 페이지 렌더링
  );
}
