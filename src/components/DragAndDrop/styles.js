import styled from "styled-components";

export const DragIconWrapper = styled.div`
  display: inline-block;
  margin: 0 5px;
`;
export const ListContainer = styled.div`
  width: calc(100% - 30px);
  font-weight: bold;
`;
export const ListItem = styled.div`
  color: black;
  padding: 0.8rem 0.3rem;
  border-bottom: 1px solid #dddddd;
   &:last-child {
    border-bottom: none;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
  background: #fafafa66;
`;
