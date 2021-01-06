import React, { Component } from "react";
import styled, { css } from "styled-components";
import ModeleForm from "./ModeleForm";
import AutonomieForm from "./AutonomieForm";
import TypePriseForm from "./TypePriseForm";
import FlCheValider from "./FlCheValider";

function Title(props) {
  return (
    <Container {...props}>
      <EntrezVotreVoiture1>1. Entrez votre voiture</EntrezVotreVoiture1>
      <Group3>
        <BodyText1>Trouvez le modèle dans la base</BodyText1>
        <ModeleForm
          style={{
            height: 36,
            alignSelf: "stretch"
          }}
        ></ModeleForm>
      </Group3>
      <Group2>
        <BodyText2>Ou entrez vos informations</BodyText2>
        <Group>
          <AutonomieForm
            style={{
              height: 37,
              alignSelf: "stretch"
            }}
          ></AutonomieForm>
          <TypePriseForm
            style={{
              alignSelf: "stretch",
              height: 36
            }}
          ></TypePriseForm>
        </Group>
      </Group2>
      <FlCheValider
        style={{
          alignSelf: "stretch",
          flex: 1
        }}
      ></FlCheValider>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 16px;
  padding-top: 24px;
  flex-wrap: wrap;
  flex-direction: column;
`;

const EntrezVotreVoiture1 = styled.span`
  font-family: Roboto;
  font-size: 24px;
  color: #000;
  padding-bottom: 12px;
  align-self: stretch;
  height: 34px;
`;

const Group3 = styled.div`
  height: 56px;
  flex-direction: column;
  display: flex;
`;

const BodyText1 = styled.span`
  font-family: Arial;
  line-height: 20px;
  font-size: 16px;
  color: #424242;
  flex-wrap: wrap;
  align-self: stretch;
`;

const Group2 = styled.div`
  height: 92px;
  flex-direction: column;
  display: flex;
`;

const BodyText2 = styled.span`
  font-family: Arial;
  line-height: 20px;
  font-size: 16px;
  color: #424242;
  flex-wrap: wrap;
  margin-top: 8px;
  height: 20px;
  align-self: stretch;
`;

const Group = styled.div`
  height: 72px;
  flex-direction: column;
  display: flex;
`;

export default Title;
