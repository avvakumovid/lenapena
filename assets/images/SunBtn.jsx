import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const SunBtn = ({ ...props }) => (
  <Svg
    width={26}
    height={26}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M13 4V1m0 24v-3m12-9h-3M4 13H1m5.56-7.19L5.5 4.75m1.06 15L5.5 20.81m14.25-15 1.06-1.06m-1.06 15 1.06 1.06M19 13a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z'
      stroke='#704EF4'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);

export default SunBtn;
