import { useState, useEffect } from "react";
import { TeamItem } from "./TeamItems";
import "./styles.scss";
import { searchTreeNodePath } from "./utils";
import { cloneDeep } from "lodash";
import TreeModel from "tree-model";

const config = {
  id: 'root',
  name: 'root',
  children: [
    {
      id: 0,
      name: "Innoscripta Munich",
      children: [
        {
          id: 1,
          name: "Group 1",
          children: [
            { id: 2, name: "Team 1" },
            { id: 3, name: "Team 2" },
            { id: 4, name: "Team 11" }
          ]
        },
        {
          id: 5,
          name: "Group 2",
          children: [
            { id: 6, name: "Team 3" },
            { id: 7, name: "Team 4" }
          ]
        }
      ]
    },
    {
      id: 8,
      name: "Innoscripta Spb",
      children: [
        {
          id: 9,
          name: "Group 3",
          children: [
            { id: 10, name: "Team 5" },
            { id: 11, name: "Team 6" }
          ]
        },
        {
          id: 12,
          name: "Group 4",
          children: [
            { id: 13, name: "Team 7" },
            { id: 14, name: "Team 8" },
            { id: 15, name: "Team 9" },
            { id: 16, name: "Team 10" }
          ]
        }
      ]
    }
  ]
};

const tree = new TreeModel();
const root = tree.parse(config)
const data = root.all(node => node.model.name.includes('1'))
console.log(data)

const Parent = ({ item, onDragStart, onDragEnd, draggable }) => (
  <div
    className="test"
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    draggable={draggable}
  >
    {item.id}. {item.name}
  </div>
);

export default function App() {
  const [path, setPath] = useState([]);
  const [draggableId, setDraggableId] = useState(null);
  const [draggedOverId, setDraggedOverId] = useState(null);
  const tree = new TreeModel();
  const root = tree.parse(config);

  useEffect(() => {
    document.body.className = "currentapp_hr teams";
  }, []);

  const searchItemPath = (id) =>
    root
      .first((node) => node.model.id === id)
      .getPath()
      .filter((node) => "id" in node.model)
      .map((node) => ({ id: node.model.id, index: node.getIndex() }));

  const onItemClick = (item) => {
    const path = searchItemPath(item.id);
    setPath(path);
  };

  const onItemDragStart = (id) => {
    console.log("drag started");
  };

  const onItemDragEnd = (id) => {
    console.log("drag ended");
  };

  const onItemDrop = (id) => {
    console.log(`draggable item ${draggableId} was dropped into zone ${id}`);
    const dropTarget = root.first((node) => node.model.id === id);
    const droppable = root.first((node) => node.model.id === draggableId);
    const node = tree.parse(droppable.model);
    dropTarget.addChild(node);
    droppable.drop();
  };

  return (
    <div className="hr-teams">
      <TeamItem
        items={root.model.children}
        onItemClick={onItemClick}
        selectedPath={path}
        onItemDragStart={onItemDragStart}
        onItemDragEnd={onItemDragEnd}
        onItemDrop={onItemDrop}
        itemNode={Parent}
        searchItemPath={searchItemPath}
        draggableId={draggableId}
        setDraggableId={setDraggableId}
        draggedOverId={draggedOverId}
        setDraggedOverId={setDraggedOverId}
      />
      {/* <div
        className="dropzone"
        onDrop={onDropZoneDrop}
        onDragOver={onDropZoneDraggedOver}
      /> */}
    </div>
  );
}
