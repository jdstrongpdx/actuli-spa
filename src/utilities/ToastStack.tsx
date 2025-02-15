import React, { useImperativeHandle, useState, forwardRef } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

interface ToastMessage {
    id: number;
    variant: string;
    message: string;
}

// Props passed to the ref so the parent can interact with it
export interface ToastStackRef {
    addToast: (variant: string, message: string) => void;
}

// Define the ToastStack component with forwarded ref
const ToastStack = forwardRef<ToastStackRef>((_, ref) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    // Expose methods to the parent via the ref
    useImperativeHandle(ref, () => ({
        addToast(variant: string, message: string) {
            const newToast: ToastMessage = { id: Date.now(), variant, message };
            setToasts((prevToasts) => [...prevToasts, newToast]);
        },
    }));

    // Remove toast after it gets closed
    const removeToast = (id: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContainer position="top-end" className="p-3">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    bg={toast.variant}
                    onClose={() => removeToast(toast.id)}
                    delay={10000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">{toast.variant.toUpperCase()}</strong>
                        <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body>
                        {toast.message}
                    </Toast.Body>
                </Toast>
                ))}
        </ToastContainer>
    );
});

export default ToastStack;