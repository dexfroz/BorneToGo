import React, { Component } from "react";
import styled, { css } from "styled-components";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";
import MaterialFixedLabelTextbox1 from "./MaterialFixedLabelTextbox1";
import MaterialFixedLabelTextbox2 from "./MaterialFixedLabelTextbox2";
import MaterialButtonDark from "./MaterialButtonDark";
import MaterialButtonDark1 from "./MaterialButtonDark1";

function MaterialCardWithoutImage(props) {
  return (
    <Container {...props}>
      <Group4>
        <BodyContent>
          <EntrezVotreTajet>2. Entrez votre tajet</EntrezVotreTajet>
          <FontAwesomeIcon
            name="pagelines"
            style={{
              top: 19,
              left: 303,
              position: "absolute",
              color: "rgba(126,211,33,1)",
              fontSize: 40
            }}
          ></FontAwesomeIcon>
        </BodyContent>
        <Group3>
          <MaterialFixedLabelTextbox1
            style={{
              height: 41,
              width: 357,
              marginTop: 48
            }}
          ></MaterialFixedLabelTextbox1>
          <MaterialFixedLabelTextbox2
            style={{
              height: 41,
              width: 357,
              marginTop: -89
            }}
          ></MaterialFixedLabelTextbox2>
        </Group3>
        <Group2>
          <MaterialButtonDark
            style={{
              height: 36,
              width: 100,
              margin: 0,
              marginRight: 6,
              marginLeft: 0
            }}
          ></MaterialButtonDark>
          <MaterialButtonDark1
            style={{
              height: 36,
              width: 100,
              margin: 0,
              marginRight: 6,
              marginLeft: 0
            }}
          ></MaterialButtonDark1>
        </Group2>
      </Group4>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-width: 1px;
  border-radius: 2px;
  border-color: #CCC;
  flex-wrap: nowrap;
  background-color: #FFF;
  overflow: hidden;
  flex-direction: column;
  border-style: solid;
  box-shadow: -2px 2px 1.5px  0.1px #000 ;
`;

const Group4 = styled.div`
  flex-direction: column;
  flex: 1 1 0%;
  align-self: stretch;
  display: flex;
`;

const BodyContent = styled.div`
  padding: 16px;
  padding-top: 24px;
  justify-content: center;
  margin-left: 8px;
  margin-right: 8px;
  flex-direction: column;
  display: flex;
  position: relative;
`;

const EntrezVotreTajet = styled.span`
  font-family: Roboto;
  font-size: 24px;
  color: #000;
  padding-bottom: 12px;
`;

const Group3 = styled.div`
  height: 91px;
  padding: 8px;
  margin-top: 8px;
  align-self: stretch;
  flex-direction: column;
  display: flex;
`;

const Group2 = styled.div`
  padding: 8px;
  flex-direction: row;
  align-self: center;
  justify-content: space-around;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 8px;
  display: flex;
`;

export default MaterialCardWithoutImage;
