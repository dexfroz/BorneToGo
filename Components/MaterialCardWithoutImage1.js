import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialFixedLabelTextbox from "./MaterialFixedLabelTextbox";
import TypePriseForm from "./TypePriseForm";
import AutonomieForm from "./AutonomieForm";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";

function MaterialCardWithoutImage1(props) {
  return (
    <Container {...props}>
      <Group>
        <Titre>
          <EntrezVotreVoiture>1. Renseignez votre véhicule</EntrezVotreVoiture>
        </Titre>
        <Group4>
          <ModeleBddTitre>Trouvez le modèle dans la base</ModeleBddTitre>
          <MaterialFixedLabelTextbox
            style={{
              height: 40,
              alignSelf: "stretch"
            }}
          ></MaterialFixedLabelTextbox>
        </Group4>
        <Group3>
          <Text>Ou entrez les informations de votre modèle</Text>
          <TypePriseForm
            style={{
              alignSelf: "stretch",
              height: 40
            }}
          ></TypePriseForm>
          <AutonomieForm
            style={{
              alignSelf: "stretch",
              height: 40
            }}
          ></AutonomieForm>
        </Group3>
        <Valider>
          <FontAwesomeIcon
            name="location-arrow"
            style={{
              color: "rgba(128,128,128,1)",
              fontSize: 40,
              alignSelf: "center"
            }}
          ></FontAwesomeIcon>
        </Valider>
      </Group>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-width: 1px;
  border-radius: 2px;
  border-color: #CCC;
  flex-wrap: wrap;
  background-color: #FFF;
  overflow: hidden;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  border-style: solid;
  box-shadow: -2px 2px 1.5px  0.1px #000 ;
`;

const Group = styled.div`
  flex-direction: column;
  align-self: stretch;
  padding: 0px;
  flex: 1 1 0%;
  display: flex;
`;

const Titre = styled.div`
  width: 357px;
  padding: 16px;
  height: 46px;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  display: flex;
`;

const EntrezVotreVoiture = styled.span`
  font-family: Roboto;
  font-size: 24px;
  color: #000;
  padding-bottom: 12px;
  height: 32px;
`;

const Group4 = styled.div`
  flex-direction: column;
  align-self: stretch;
  align-items: stretch;
  flex: 0.4315384615384614 1 0%;
  padding: 8px;
  display: flex;
`;

const ModeleBddTitre = styled.span`
  font-family: Arial;
  line-height: 20px;
  font-size: 16px;
  color: #424242;
  flex-wrap: wrap;
  align-self: baseline;
  height: 26px;
  margin-top: 8px;
`;

const Group3 = styled.div`
  flex-direction: column;
  padding: 8px;
  flex: 0.6284615384615384 1 0%;
  align-self: stretch;
  display: flex;
`;

const Text = styled.span`
  font-family: Arial;
  line-height: 20px;
  font-size: 16px;
  color: #424242;
  flex-wrap: wrap;
  align-self: baseline;
  height: 26px;
  margin-top: 8px;
`;

const Valider = styled.div`
  padding: 8px;
  align-items: stretch;
  justify-content: flex-start;
  align-self: stretch;
  height: 58px;
  flex-direction: column;
  display: flex;
`;

export default MaterialCardWithoutImage1;
