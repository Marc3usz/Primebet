import React, { useState } from "react";
import ReactDOM from "react-dom"; // Updated import
import ReactDomClient from "react-dom/client"
import Lottie from "lottie-react";
import { useRef } from "react";
/// pierwszy raz tak prawilnie uzywalem reacta ale cos sie non stop psulo to stwierdzilem ze TS moze pomoc lol


// import animacji do lottie
import successAnimation from "../../assets/success.json";
import failureAnimation from "../../assets/failure.json";

type AlertModalProps = {
  status: boolean;
  message: string;
  onClose: () => void;
};

// modal z alertem
const AlertModal: React.FC<AlertModalProps> = ({ status, message, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 flex flex-col items-center">
        <div className="w-24 h-24 mb-4">
          <Lottie animationData={status ? successAnimation : failureAnimation} loop={false} />
        </div>
        <p className="text-xl font-semibold mb-4">{status ? "Success!" : "Failure!"}</p>
        <p className="text-center mb-6">{message}</p>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>,
    document.body
  );
};

/// caly kod ponizej to tweaker mode active
/// zamyslem tego mial byc ze dziala jak alert ale fajniej wyglada i jest responsywne (mogl byc alert ale juz za pozno)
export const showAlert = (() => {
  let showAlertInstance: (status: boolean, message: string) => Promise<void>;

  const AlertWrapper: React.FC = () => {
    const [modalProps, setModalProps] = useState<AlertModalProps | null>(null);
    const resolvePromiseRef = useRef<(() => void) | null>(null); // bylo w state ale sie magicznie usuwalo dokladnie przed wywolaniem lol

    const handleClose = () => {
      if (resolvePromiseRef.current) {
        resolvePromiseRef.current(); // ogolnie to uzywam promise zebym mogl poczekac np przed przekierowaniem (dzieje sie to w jednym miejscu tylko 😭)
      } else {
      }
      setModalProps(null); // zamyka
    };

    showAlertInstance = (status: boolean, message: string) => {
      return new Promise<void>((resolve) => {
        setModalProps({ status, message, onClose: handleClose });
        resolvePromiseRef.current = resolve; // zapisuje resolver
      });
    };

    return modalProps ? (
      <AlertModal
        status={modalProps.status}
        message={modalProps.message}
        onClose={modalProps.onClose}
      />
    ) : null;
  };
  const container = document.createElement("div");
  // dopisuje alert odrebnie od reszty aplikacji (jak alert w wyszukiwarce)
  document.body.appendChild(container);
  ReactDomClient.createRoot(container).render(<AlertWrapper />);

  return (status: boolean, message: string): Promise<void> => {
    if (showAlertInstance) {
      return showAlertInstance(status, message);
    }
    return Promise.resolve(); // resolwuje promise'a jak modal znika
  };
})();

