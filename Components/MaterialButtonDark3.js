import React, { Component } from "react";
import styled, { css } from "styled-components";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";

function MaterialButtonDark3(props) {
  return (
    <Container {...props}>
      <FontAwesomeIcon
        name="location-arrow"
        style={{
          color: "rgba(255,255,255,1)",
          fontSize: 40,
          alignSelf: "center"
        }}
      ></FontAwesomeIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #212121;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  min-width: 88px;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

export default MaterialButtonDark3;
