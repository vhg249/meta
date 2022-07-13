import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { colors } from "../../theme/colors";
import breakpoints from "@Theme/breakpoints";
import Table from "@Components/Table";
import close_icon from "@Assets/images/X.png";
import { useMedia } from "react-use";


export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .5s;

`;
export const ModalBoxTest = styled.div`
  border-radius: 16px;
  background-color: ${colors.second_bg};
  width: 70%;
  transition: .5s;
    
  @media ${breakpoints.xs} {
    width: 375px;
  }
`;


const ModelTableExpand = (props) => {
    const belowSM = useMedia(breakpoints.sm);
    return (
        <>
            <ModalWrapper>
                <ModalBoxTest>
                <Table  onCloseTableExpand={props.onCloseTableExpand} expand={props.expand} title={props.title} fields={props.tableFields} data={props.tableData} />

                </ModalBoxTest>
            </ModalWrapper>

        </>
    )
}
export default ModelTableExpand;


