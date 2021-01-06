import React, { Component } from "react";
import styled, { css } from "styled-components";
import IoniconsIcon from "react-native-vector-icons/dist/Ionicons";

function MaterialButtonHamburger(props) {
  return (
    <Container {...props}>
      <IoniconsIcon
        name="ios-arrow-dropleft"
        style={{
          color: "rgba(255,255,255,1)",
          fontSize: 24
        }}
      ></IoniconsIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(126,211,33,1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  box-shadow: 0px 1px 5px  0.35px #000 ;
`;

export default MaterialButtonHamburger;
