import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialCardWithoutImage2(props) {
  return <Container {...props}></Container>;
}

const Container = styled.div`
  border-width: 1px;
  border-radius: 2px;
  border-color: #CCC;
  flex-wrap: wrap;
  background-color: #FFF;
  overflow: hidden;
  border-style: solid;
  box-shadow: -2px 2px 1.5px  0.1px #000 ;
`;

export default MaterialCardWithoutImage2;
