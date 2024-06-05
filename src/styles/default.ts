import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export const Wrapper = styled.div`
  width: 70%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const WhiteButton = styled.button`
  font-size: 20px;
  font-weight: bold;
  width: 150px;
  height: 50px;
  color: #019868;
  border: solid 1px #019868;
  margin: 0 5px;
  background-color: white;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: white;
    background-color: #019868;
  }
`;
export const ColorButton = styled.button`
  font-size: 20px;
  font-weight: bold;
  width: 150px;
  height: 50px;
  color: white;
  border: solid 1px white;
  margin: 0 5px;
  background-color: #019868;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: white;
    background-color: #01704d;
  }
`;
export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
