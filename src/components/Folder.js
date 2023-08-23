import React from "react";
import { useState } from "react";

function Folder({ explorerData, handleInsertNode, handleDeleteNode }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (event, isFolder) => {
    event.stopPropagation();
    setExpand(true);
    setShowInput({ ...showInput, visible: true, isFolder });
  };

  const onAddNewFolder = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      handleInsertNode(explorerData.id, event.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleDeleteFolder = (event, folderId) => {
    handleDeleteNode(explorerData.id, folderId, showInput.isFolder);
  };

  return (
    <>
      {Object.keys(explorerData).length !== 0 && (
        <>
          {explorerData.isFolder ? (
            <div style={{ marginTop: 5 }}>
              <div className="folder" onClick={() => setExpand(!expand)}>
                <span>📂{explorerData.name}</span>
                <div>
                  <button onClick={(event) => handleNewFolder(event, true)}>
                    Folder +
                  </button>
                  <button onClick={(event) => handleNewFolder(event, false)}>
                    File +
                  </button>
                  <button
                    onClick={(event) =>
                      handleDeleteFolder(event, explorerData.id)
                    }
                  >
                    Delete 📂
                  </button>
                </div>
              </div>
              <div
                style={{
                  display: expand ? "block" : "none",
                  paddingLeft: "5px",
                }}
              >
                {showInput.visible && (
                  <div className="inputContainer">
                    {showInput.isFolder ? "📂" : "📃"}
                    <input
                      className="inputButton"
                      autoFocus
                      type="text"
                      onBlur={() =>
                        setShowInput({ ...showInput, visible: false })
                      }
                      onKeyDown={(event) => onAddNewFolder(event)}
                    />
                  </div>
                )}
                {explorerData.items.map((explorerContent, index) => {
                  return (
                    <Folder
                      explorerData={explorerContent}
                      handleInsertNode={handleInsertNode}
                      handleDeleteNode={handleDeleteNode}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            explorerData?.name && (
              <div style={{ display: "flex", gap: "5px" }}>
                <span className="file">📃{explorerData.name}</span>
                <button
                  onClick={(event) =>
                    handleDeleteFolder(event, explorerData.id)
                  }
                >
                  Delete 📃
                </button>
              </div>
            )
          )}
        </>
      )}
    </>
  );
}

export default Folder;
