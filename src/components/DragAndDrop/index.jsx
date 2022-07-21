import React from "react";
import { ListContainer, ListItem } from "./styles";
import { DragHandle } from "./DragHandle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default class Widget extends React.Component {
  render() {
  const list = this.props.data;

    return (
    <div className="App">
      <DragDropContext
        onDragEnd={(param) => {
          const src = param.source.index;
          const des = param.destination?.index;
          if (des) {
            list.splice(des, 0, list.splice(src, 1)[0]);
            this.props.updateOrder(list[src],list[des]);
          }
        }}
      >
        <ListContainer>
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((item, i) => (
                  <Draggable
                    key={item.id}
                    draggableId={"draggable-" + item.order_level}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          boxShadow: snapshot.isDragging
                            ? "0 0 .4rem #666"
                            : "none",
                        }}
                      >
                        <DragHandle {...provided.dragHandleProps} />
                        <span style={{
                          color: item.public==1
                            ? "black"
                            : "red",
                        }}>{item.label}</span>


{item.children&&
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            list.splice(desI, 0, list.splice(srcI, 1)[0]);
            this.props.updateOrder(list[srcI],list[desI]);
          }
        }}
      >
        <ListContainer style={{border:'1px solid #dddddd',position:'relative',left:'30px',width: '100%',fontWeight:'normal'}}>
          <Droppable droppableId="drop-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {item.children.map((child, i) => (
                  <Draggable
                    key={child.id}
                    draggableId={"drag-" + child.order_level}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          boxShadow: snapshot.isDragging
                            ? "0 0 .4rem #666"
                            : "none",
                        }}
                      >
                        <DragHandle style={{display:'none'}} {...provided.dragHandleProps} />
                        <span style={{
                          color: child.public==1
                            ? "black"
                            : "red",
                        }}>{child.label}</span>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ListContainer>
      </DragDropContext>
}



                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ListContainer>
      </DragDropContext>
    </div>
  );
};
}