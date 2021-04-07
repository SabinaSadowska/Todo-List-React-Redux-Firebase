import styled from "styled-components";

export const Item = styled.p`
  text-decoration: ${(props) => (props.active ? "none" : "line-through")};
  color: ${(props) => (props.active ? "rgb(48, 48, 49)" : "grey")};
  cursor: pointer;
`;
