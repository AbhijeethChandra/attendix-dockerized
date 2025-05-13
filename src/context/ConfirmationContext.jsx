import React, { createContext, useState, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";

// Create Context
const ConfirmationContext = createContext();

// Confirmation Dialog Component
const ConfirmationDialog = () => {
  const {
    state: { isOpen, title, confirmText, cancelText },
    handlers: { onConfirm, onCancel, closeDialog },
  } = useContext(ConfirmationContext);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          maxWidth: "400px",
          width: "100%",
          position: "relative",
        }}
      >
        {/* Close button in top-right corner */}
        <button
          onClick={closeDialog}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            color: "#666",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <CloseIcon fontSize="small" />
        </button>

        {/* Dialog Content */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 500, color: "#333" }}>
            {title}
          </h2>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={() => {
              onCancel();
              closeDialog();
            }}
            style={{
              padding: "8px 24px",
              backgroundColor: "white",
              color: "#333",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              closeDialog();
            }}
            style={{
              padding: "8px 24px",
              backgroundColor: "var(--primary-clr, #1E293B)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Provider Component
export const ConfirmationProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    title: "Are you sure to save the details...?",
    confirmText: "YES",
    cancelText: "NO",
  });

  // Store the resolve function from the Promise
  const [resolveRef, setResolveRef] = useState(null);

  // Close the dialog
  const closeDialog = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  // Handler for confirm action
  const handleConfirm = () => {
    if (resolveRef) {
      resolveRef(true);
      setResolveRef(null);
    }
  };

  // Handler for cancel action
  const handleCancel = () => {
    if (resolveRef) {
      resolveRef(false);
      setResolveRef(null);
    }
  };

  // Function to open the dialog and return a Promise
  const confirm = (options = {}) => {
    return new Promise((resolve) => {
      setState((prev) => ({
        ...prev,
        isOpen: true,
        title: options.title || prev.title,
        confirmText: options.confirmText || prev.confirmText,
        cancelText: options.cancelText || prev.cancelText,
      }));

      setResolveRef(() => resolve);
    });
  };

  const contextValue = {
    state,
    handlers: {
      onConfirm: handleConfirm,
      onCancel: handleCancel,
      closeDialog,
      confirm,
    },
  };

  return (
    <ConfirmationContext.Provider value={contextValue}>
      {children}
      <ConfirmationDialog />
    </ConfirmationContext.Provider>
  );
};

// Custom hook to use the confirmation dialog
export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error(
      "useConfirmation must be used within a ConfirmationProvider"
    );
  }
  return context.handlers.confirm;
};
