import * as React from "react";
import Svg, { Rect, Path, Circle } from "react-native-svg";

const Accept = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    width={190}
    height={190}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Circle
      cx={95}
      cy={95}
      r={94}
      stroke={externalBorderColor}
      strokeWidth={2}
    />
    <Circle
      cx={95}
      cy={95}
      r={93}
      stroke={internalBorderColor}
      strokeOpacity={0.35}
      strokeWidth={4}
    />
    <Path
      d='m64.781 94.5 23.344 23.344M88.125 117.844l44.094-46.688'
      stroke={contentColor}
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);

export default Accept;
