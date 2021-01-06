import React, { Component } from "react";
import styled, { css } from "styled-components";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";

function Valider(props) {
  return (
    <Container {...props}>
      <FontAwesomeIcon
        name="location-arrow"
        style={{
          color: "rgba(128,128,128,1)",
          fontSize: 40,
          alignSelf: "center"
        }}
      ></FontAwesomeIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Valider;
