import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  CountdownWrapper,
  CountdownBox,
  CountdownTime,
  Title,
} from "./StyledModal";
import { colors } from "@Theme/colors";

const CountDown = ({ timeTillDate = 0, timeTypeObject = false }) => {
  const [dateData, setDateData] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().valueOf();
      const countdown = moment(timeTillDate * 1000 - now);
      if (timeTillDate * 1000 - now < 0) {
        setDateData({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      } else {
        const days = countdown.format("DD");
        const hours = countdown.format("HH");
        const minutes = countdown.format("mm");
        const seconds = countdown.format("ss");

        setDateData({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeTillDate]);
  if (!timeTypeObject) {
    return (
      <CountdownWrapper>
        <Title>Voting ends in</Title>
        <CountdownBox>
          <CountdownTime>
            {dateData.days}
            <Text color={colors.text} type="body2">
              DAYS
            </Text>
          </CountdownTime>
          <CountdownTime>:</CountdownTime>
          <CountdownTime>
            {dateData.hours}
            <Text color={colors.text} type="body2">
              HOURS
            </Text>
          </CountdownTime>
          <CountdownTime>:</CountdownTime>
          <CountdownTime>
            {dateData.minutes}
            <Text color={colors.text} type="body2">
              MINUTES
            </Text>
          </CountdownTime>
          <CountdownTime>:</CountdownTime>
          <CountdownTime>
            {dateData.seconds}
            <Text color={colors.text} type="body2">
              SECONDS
            </Text>
          </CountdownTime>
        </CountdownBox>
      </CountdownWrapper>
    );
  } else {
    return `${dateData.days}:${dateData.hours}:${dateData.minutes}:${dateData.seconds}`;
  }
};

export default CountDown;
