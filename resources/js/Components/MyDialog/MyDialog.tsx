import { FaWindowClose } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";

interface MyDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
}



export default function MyDialog({
    children,
    isOpen,
    setIsOpen,
}: MyDialogProps) {


const close = () => {
  setIsOpen(false)
}

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-96 flex items-center justify-center"
        >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />
            <Dialog.Panel className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4 absolute">
              <div className="flex justify-end">
                <button onClick={close}>
                <FaWindowClose  className=" hover:text-blue-600"/>
                </button>
              </div>
                <div className="text-gray-900 text-center px-4 py-4">
                    {children}
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
