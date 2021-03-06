import React, { useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { Flag } from "../redux/reducers/QuizReducer";
import { Badge } from "../redux/reducers/UquizReducer";
import {
  film,
  ribbonSharp,
  restaurant,
  earth,
  peopleCircle,
  business,
} from "ionicons/icons";
import { Theme } from "../redux/constants";

const BadgeElement: React.FC<{
  key: string;
  badges: Badge[];
  flag: Flag;
  theme: string;
  selectBadge: any;
}> = (props) => {
  let colorStyle = "black";
  let opacity = 0.5;
  const userBadge = props.badges.find(
    (badge) =>
      badge.countryWD === props.flag.WdCode && badge.theme === props.theme
  );

  useEffect(() => {
    console.log("in BadgeElement", props.flag);
  });

  //if user has won this badge, set the correct color
  if (userBadge) {
    colorStyle =
      userBadge.award === "Gold"
        ? "gold"
        : userBadge.award === "Silver"
        ? "silver"
        : userBadge.award === "Bronze"
        ? "darkorange"
        : "black";

    opacity = 1;
  }
  const icon =
    props.theme === Theme.CINEMA ? (
      <IonIcon icon={film}></IonIcon>
    ) : props.theme === Theme.FOOD ? (
      <IonIcon icon={restaurant}></IonIcon>
    ) : props.theme === Theme.GEO ? (
      <IonIcon icon={earth}></IonIcon>
    ) : props.theme === Theme.CELEBRITIES ? (
      <IonIcon icon={peopleCircle}></IonIcon>
    ) : props.theme === Theme.ENTERPRISES ? (
      <IonIcon icon={business}></IonIcon>
    ) : (
      <IonIcon icon={ribbonSharp}></IonIcon>
    );
  return (
    <span>
      <span
        style={{ opacity: opacity }}
        onClick={() => props.selectBadge(props.flag, userBadge, props.theme)}
      >
        <img src={props.flag.image} className="badgeImg" alt="badge"></img>
        <span className="trophee">
          <span style={{ color: colorStyle }}>{icon}</span>
        </span>
      </span>
    </span>
  );
};

export default BadgeElement;
