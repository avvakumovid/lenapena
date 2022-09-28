import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const PlayBtn = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    style={style}
    width={60}
    height={60}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Circle
      cx={30}
      cy={30}
      r={29}
      stroke={externalBorderColor}
      strokeWidth={2}
    />
    <Circle
      cx={30}
      cy={30}
      r={28}
      stroke={internalBorderColor}
      strokeOpacity={0.35}
      strokeWidth={4}
    />
    <Path
      d='M26 19.024 40.354 30 26 40.976V19.024Z'
      stroke={contentColor}
      strokeWidth={2}
    />
  </Svg>
);

export default PlayBtn;
