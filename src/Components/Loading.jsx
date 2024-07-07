import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({ loading, color, size, height }) => {
    return (
        <div className="loading-container" style={{ height: height && "100vh" }}>
            <ClipLoader
                color={color ? color : "#ffffff"}
                loading={loading}
                // cssOverride={override}
                size={size ? size : 20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loading;