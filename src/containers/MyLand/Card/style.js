import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import circle_bg from "@Assets/images/circle-bg.png";
import { colors } from "@Theme/colors";

export const Badge = styled.div`
    position: absolute;
    width: 60px;
    height: 23.99px;
    right: 40px;
    top: 36px;
    background: #FBBC05;
    border-radius: 31.8992px;
    display:grid;
    place-content: center;
    & > span{
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #1D2852;
    }
`;
export const Title = styled.span`
    display: block;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #F5F5F5;
`;

export const Address = styled.span`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 8px 0;
    gap: 4px;
    & > span {
        display: block;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.01em;
        color: #C0C0C0;
    }
`;

export const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0;
    & > span{
        display: block;
        font-size: 14px;
        color: #C0C0C0;
    }
`;

export const Button = styled.button`
    border-radius: 12px;
    background-color: ${colors.primary};
    color: #ececec;
    border: none;
    padding: 9px 15px;
    cursor: pointer;
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    font-weight: 600;
    width: 100%;
    margin: 16px 0;
    @media ${breakpoints.sm} {
        font-size: 16px;
    }
`;

