// src/components/FormMessage.jsx
import React from "react";
import PropTypes from "prop-types";

/**
 * A reusable component for displaying a success or error message.
 *
 * Props:
 *   - type:     "error" | "success" | "info" | "warning"
 *   - children: the text (or JSX) to render inside the box
 *
 * Usage:
 *   <FormMessage type="error">Something went wrong!</FormMessage>
 *   <FormMessage type="success">Your account was created.</FormMessage>
 */
export default function FormMessage({ type, children }) {
    // Map the “type” prop to a Bootstrap‐style CSS class
    // (or your own CSS class name, see step 2).
    const variantClass = {
        error:   "alert-danger",
        success: "alert-success",
        info:    "alert-info",
        warning: "alert-warning",
    }[type];

    // If someone passed an unrecognized “type,” default to gray background:
    const safeClass = variantClass || "alert-secondary";

    return (
        <div role="alert" className={`alert ${safeClass} my-3`}>
            {children}
        </div>
    );
}

FormMessage.propTypes = {
    type: PropTypes.oneOf(["error", "success", "info", "warning"]).isRequired,
    children: PropTypes.node.isRequired,
};
