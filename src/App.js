import { useState } from "react";
import { explorer } from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/useTraverseTree";
import "./App.css";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId, item, isFolder) => {
    const finalTree = deleteNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  return (
    <div className="App">
      <h2>File Explorer</h2>
      <Folder
        explorerData={explorerData}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
      />
    </div>
  );
}

export default App;
