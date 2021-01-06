import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";

function MaterialHeader1(props) {
  return (
    <Container {...props}>
      <LeftIconButtonRow>
        <LeftIconButton>
          <ButtonOverlay>
            <MaterialCommunityIconsIcon
              name="menu"
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontSize: 24
              }}
            ></MaterialCommunityIconsIcon>
          </ButtonOverlay>
        </LeftIconButton>
        <TextWrapper>
          <BorneToGo numberOfLines={1}>BorneToGo</BorneToGo>
        </TextWrapper>
      </LeftIconButtonRow>
      <LeftIconButtonRowFiller></LeftIconButtonRowFiller>
      <RightIconButton>
        <ButtonOverlay>
          <MaterialCommunityIconsIcon
            name="dots-vertical"
            style={{
              backgroundColor: "transparent",
              color: "#FFFFFF",
              fontSize: 24
            }}
          ></MaterialCommunityIconsIcon>
        </ButtonOverlay>
      </RightIconButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #3F51B5;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  justify-content: space-between;
  box-shadow: 0px 2px 1.2px  0.2px #111 ;
`;

const ButtonOverlay = styled.button`
 display: block;
 background: none;
 height: 100%;
 width: 100%;
 border:none
 `;
const LeftIconButton = styled.div`
  padding: 11px;
  flex-direction: column;
  display: flex;
  border: none;
`;

const TextWrapper = styled.div`
  flex-direction: column;
  display: flex;
  align-self: flex-end;
  margin-left: 45px;
`;

const BorneToGo = styled.span`
  font-family: Roboto;
  font-size: 18px;
  color: #FFFFFF;
  background-color: transparent;
  line-height: 18px;
  font-weight: 600;
`;

const LeftIconButtonRow = styled.div`
  flex-direction: row;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 19px;
  display: flex;
`;

const LeftIconButtonRowFiller = styled.div`
  flex: 1 1 0%;
  flex-direction: row;
  display: flex;
`;

const RightIconButton = styled.div`
  padding: 11px;
  align-items: center;
  flex-direction: column;
  display: flex;
  margin-right: 5px;
  margin-top: 5px;
  border: none;
`;

export default MaterialHeader1;
