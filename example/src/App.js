import React, { useRef, useState } from "react";
import ActionSheet from "actionsheet-react";
import "./App.css";

function App() {
  const basicActionSheetRef = useRef();
  const topActionSheetRef = useRef();
  const customActionSheetRef = useRef();
  const listActionSheetRef = useRef();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = option => {
    setSelectedOption(option);
    listActionSheetRef.current?.close();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ActionSheet React Demo</h1>
        <p>A modern, accessible bottom sheet component for React</p>
      </header>

      <main className="demo-container">
        <div className="demo-section">
          <h2>Basic Examples</h2>

          <div className="button-group">
            <button
              className="demo-button"
              onClick={() => basicActionSheetRef.current?.open()}
            >
              Basic Bottom Sheet
            </button>

            <button
              className="demo-button"
              onClick={() => topActionSheetRef.current?.open()}
            >
              Top Sheet (Reverse)
            </button>

            <button
              className="demo-button"
              onClick={() => customActionSheetRef.current?.open()}
            >
              Custom Styled Sheet
            </button>

            <button
              className="demo-button"
              onClick={() => listActionSheetRef.current?.open()}
            >
              Action List
            </button>
          </div>

          {selectedOption && (
            <div className="selection-display">
              <p>
                Selected: <strong>{selectedOption}</strong>
              </p>
            </div>
          )}
        </div>

        <div className="demo-section">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🚀 Performance</h3>
              <p>Optimized animations with 60fps smoothness</p>
            </div>
            <div className="feature-card">
              <h3>♿ Accessible</h3>
              <p>WCAG compliant with keyboard navigation</p>
            </div>
            <div className="feature-card">
              <h3>📱 Touch Friendly</h3>
              <p>Responsive gestures for mobile devices</p>
            </div>
            <div className="feature-card">
              <h3>🎨 Customizable</h3>
              <p>Full control over styling and behavior</p>
            </div>
          </div>
        </div>
      </main>

      {/* Basic ActionSheet */}
      <ActionSheet
        ref={basicActionSheetRef}
        onClose={() => console.log("Basic sheet closed")}
        aria-label="Basic action sheet"
      >
        <div className="sheet-content">
          <div className="sheet-header">
            <div className="sheet-handle" />
            <h3>Basic Action Sheet</h3>
          </div>
          <div className="sheet-body">
            <p>This is a basic action sheet that slides up from the bottom.</p>
            <p>
              You can drag it down to close, click the background, or press
              Escape.
            </p>
            <div className="sheet-actions">
              <button
                className="action-button primary"
                onClick={() => basicActionSheetRef.current?.close()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </ActionSheet>

      {/* Top ActionSheet */}
      <ActionSheet
        ref={topActionSheetRef}
        reverse={true}
        onClose={() => console.log("Top sheet closed")}
        aria-label="Top action sheet"
      >
        <div className="sheet-content">
          <div className="sheet-header">
            <h3>Top Action Sheet</h3>
            <div className="sheet-handle" />
          </div>
          <div className="sheet-body">
            <p>This action sheet slides down from the top!</p>
            <p>Perfect for notifications or top-level actions.</p>
            <div className="sheet-actions">
              <button
                className="action-button primary"
                onClick={() => topActionSheetRef.current?.close()}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </ActionSheet>

      {/* Custom Styled ActionSheet */}
      <ActionSheet
        ref={customActionSheetRef}
        onClose={() => console.log("Custom sheet closed")}
        bgStyle={{ backgroundColor: "rgba(139, 69, 19, 0.8)" }}
        sheetStyle={{
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          borderRadius: "20px 20px 0 0",
        }}
        aria-label="Custom styled action sheet"
      >
        <div className="sheet-content dark">
          <div className="sheet-header">
            <div className="sheet-handle dark" />
            <h3>Custom Styled Sheet</h3>
          </div>
          <div className="sheet-body">
            <p>This sheet has custom background and styling.</p>
            <p>You can customize colors, borders, and animations.</p>
            <div className="sheet-actions">
              <button
                className="action-button dark"
                onClick={() => customActionSheetRef.current?.close()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </ActionSheet>

      {/* List ActionSheet */}
      <ActionSheet
        ref={listActionSheetRef}
        onClose={() => console.log("List sheet closed")}
        threshold={80}
        aria-label="Action list sheet"
      >
        <div className="sheet-content">
          <div className="sheet-header">
            <div className="sheet-handle" />
            <h3>Choose an Option</h3>
          </div>
          <div className="sheet-body">
            <div className="action-list">
              <button
                className="list-item"
                onClick={() => handleOptionSelect("Share")}
              >
                <span className="list-icon">📤</span>
                Share
              </button>
              <button
                className="list-item"
                onClick={() => handleOptionSelect("Edit")}
              >
                <span className="list-icon">✏️</span>
                Edit
              </button>
              <button
                className="list-item"
                onClick={() => handleOptionSelect("Copy Link")}
              >
                <span className="list-icon">🔗</span>
                Copy Link
              </button>
              <button
                className="list-item"
                onClick={() => handleOptionSelect("Download")}
              >
                <span className="list-icon">💾</span>
                Download
              </button>
              <button
                className="list-item danger"
                onClick={() => handleOptionSelect("Delete")}
              >
                <span className="list-icon">🗑️</span>
                Delete
              </button>
            </div>
          </div>
        </div>
      </ActionSheet>
    </div>
  );
}

export default App;
