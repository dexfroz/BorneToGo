import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import MaterialButtonHamburger from "./MaterialButtonHamburger";
import MaterialButtonHamburger1 from "./MaterialButtonHamburger1";

function MaterialCardWithoutImage3(props) {
  return (
    <Container {...props}>
      <Group3>
        <BodyContent>
          <TitleStyle>
            3. Titre cool en lien avec l&#39;environnement
          </TitleStyle>
        </BodyContent>
        <Button>
          <ButtonOverlay>
            <EconomieDenergie>Economie d&#39;énergie</EconomieDenergie>
            <MaterialCommunityIconsIcon
              name="lightbulb-on"
              style={{
                color: "rgba(255,255,255,1)",
                fontSize: 40
              }}
            ></MaterialCommunityIconsIcon>
            <EconomieDenergie1>
              Temps d&#39;éclairage économisé :
            </EconomieDenergie1>
            <Text>Puissance électrique économisée :</Text>
          </ButtonOverlay>
        </Button>
        <BoutonsStatistique>
          <StatPrecedenteRow>
            <MaterialButtonHamburger
              style={{
                height: 36,
                width: 36
              }}
            ></MaterialButtonHamburger>
            <MaterialButtonHamburger1
              style={{
                height: 36,
                width: 36,
                marginLeft: 68
              }}
            ></MaterialButtonHamburger1>
          </StatPrecedenteRow>
        </BoutonsStatistique>
      </Group3>
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

const ButtonOverlay = styled.button`
 display: block;
 background: none;
 height: 100%;
 width: 100%;
 border:none
 `;
const Group3 = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1 1 0%;
  display: flex;
`;

const BodyContent = styled.div`
  padding: 16px;
  padding-top: 24px;
  justify-content: center;
  align-self: stretch;
  height: 81px;
  flex-direction: column;
  display: flex;
`;

const TitleStyle = styled.span`
  font-family: Roboto;
  font-size: 24px;
  color: #000;
  padding-bottom: 12px;
  align-self: stretch;
`;

const Button = styled.div`
  width: 234px;
  height: 159px;
  background-color: rgba(248,194,28,1);
  border-width: 10px;
  border-color: rgba(248,194,28,1);
  border-style: solid;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 8px;
`;

const EconomieDenergie = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 700;
  color: rgba(255,255,255,1);
  text-align: center;
  font-size: 16px;
`;

const EconomieDenergie1 = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  text-align: center;
`;

const Text = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  text-align: center;
`;

const BoutonsStatistique = styled.div`
  width: 140px;
  height: 36px;
  padding: 8px;
  margin-bottom: 8px;
  flex-direction: row;
  display: flex;
`;

const StatPrecedenteRow = styled.div`
  height: 36px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
`;

export default MaterialCardWithoutImage3;
