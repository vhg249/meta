import styled from "styled-components";
import { colors } from "@Theme/colors";
import breakpoints from "@Theme/breakpoints";

export const CardContainer = styled.div`
  width: 100%;
  border-radius: 7px;
  padding: 20px;
  background: ${colors.third_bg};
  box-shadow: 2px 4px 6px rgba(7, 12, 56, 0.1);
  position: relative;

`;

export const CardImg = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 7px;
  margin-bottom: 16px;
`;

export const CardBody = styled.div`
  @media ${breakpoints.sm} {
    padding : 15px 10px 10px;
  }
`;
