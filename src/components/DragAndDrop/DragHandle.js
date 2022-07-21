import { DragIconWrapper } from "./styles";
import { ReactComponent as DragHandleIcon } from "./drag_handle-black-dp.svg";
import React from "react";

export function DragHandle(props) {
  return (
    <DragIconWrapper {...props}>
      <DragHandleIcon />
    </DragIconWrapper>
  );
}
