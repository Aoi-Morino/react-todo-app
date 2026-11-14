type ModalProps = {
  isOpen: boolean;
  onClose: () => void; // 修正点：'void' から '() => void' へ
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps ) => {
  // isOpenがfalseなら、何も表示しない (nullを返す)
  if (!isOpen) {
    return null;
  }

  return (
    // オーバーレイ（背景を暗くする部分）
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // 背景をクリックしても閉じられるようにする
    >
      {/* モーダル本体 */}
      <div 
        className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // モーダル内のクリックが背景に伝わらないようにする
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;