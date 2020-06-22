import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import getStatusMapping from "./utils/getStatusMapping";
import {
  makeStyles,
  Grid,
  Card,
  CardActionArea,
  Drawer,
} from "@material-ui/core";
import CopDetail from "./CopDetail";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    textAlign: "left",
    padding: "26px",
    width: "352px",
    height: "300px",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "17px",
  },
}));

export const CardHeader = styled.div`
  font-weight: 900;
  font-size: 26px;
  line-height: 31px;
`;

export const CardBody = styled.div`
  margin-top: 37px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
`;

export const CardRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export const CardInfoItem = styled.div`
  flex: 1;
  margin-bottom: 16px;
`;

export const CardInfoItemFullRow = styled.div`
  flex: 1;
  margin-bottom: 16px;
`;

export const CardFooter = styled.div`
  display: flex;
  color: #000;
  position: absolute;
  right: 26px;
  bottom: 26px;
  :hover {
    cursor: pointer;
  }
`;

export const CardInfoItemLabel = styled.div`
  color: #9c9c9c;
`;

export const CardInfoItemValue = styled.div`
  margin-top: 4px;
`;

export const StatusBadge = styled.div`
  background-color: black;
  color: white;
  border-radius: 26px;
  padding: 2px;
  margin-top: 4px;
  padding: 4px 8px;
  display: inline-block;
`;

const CopCard = (props) => {
  const classes = useStyles();
  const { disableClick, cop, cops } = props;
  const { date, incidentCount, location, name, status, victim } = cop;

  const [state, setState] = useState({ open: false });
  const { open } = state;

  const toggleDrawer = (open) => (event) => {
    console.log("Showing", open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ open });
  };

  console.log(cops);

  return (
    <>
      <Grid item>
        <CardActionArea onClick={toggleDrawer(true)} disabled={disableClick}>
          <Card className={classes.cardContainer}>
            <CardHeader>{name}</CardHeader>
            <CardBody>
              <CardRow>
                <CardInfoItem>
                  <CardInfoItemLabel>{"RECENT INCIDENT"}</CardInfoItemLabel>
                  <CardInfoItemValue>{victim}</CardInfoItemValue>
                </CardInfoItem>
                <CardInfoItem>
                  <CardInfoItemLabel>{"LOCATION"}</CardInfoItemLabel>
                  <CardInfoItemValue>{location}</CardInfoItemValue>
                </CardInfoItem>
              </CardRow>
              <CardRow>
                <CardInfoItem>
                  <CardInfoItemLabel>{"YEAR"}</CardInfoItemLabel>
                  <CardInfoItemValue>{date}</CardInfoItemValue>
                </CardInfoItem>
                <CardInfoItem>
                  <CardInfoItemLabel>{"# INCIDENTS"}</CardInfoItemLabel>
                  <CardInfoItemValue>{incidentCount}</CardInfoItemValue>
                </CardInfoItem>
              </CardRow>
              <CardRow>
                <CardInfoItemFullRow>
                  <CardInfoItemLabel>{"STATUS"}</CardInfoItemLabel>
                  <StatusBadge>{getStatusMapping(status)}</StatusBadge>
                </CardInfoItemFullRow>
              </CardRow>
            </CardBody>
          </Card>
        </CardActionArea>
      </Grid>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        className={classes.drawer}
      >
        <CopDetail cop={cop} allCops={cops} onClickBack={toggleDrawer(false)} />
      </Drawer>
    </>
  );
};

export default CopCard;

CopCard.propTypes = {
  cop: PropTypes.shape({
    chargedOrIndicted: PropTypes.string,
    date: PropTypes.number,
    department: PropTypes.string,
    incidentCount: PropTypes.number,
    location: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
  }),
  data: PropTypes.array,
  inline: PropTypes.bool,
  onFooterClick: PropTypes.func,
};
