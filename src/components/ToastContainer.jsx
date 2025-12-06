import { createPortal } from 'react-dom';
import Toast from './Toast';

function ToastContainer({ toasts = [], removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] flex flex-col gap-3 items-center">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>,
    document.body
  );
}

export default ToastContainer;
