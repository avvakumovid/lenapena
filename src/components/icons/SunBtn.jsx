import * as React from 'react';
import Svg, { Rect, Path, Stop, Defs, LinearGradient } from 'react-native-svg';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const SunBtn = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    scale={vh(0.1)}
    width={26}
    height={26}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M13 4V1m0 24v-3m12-9h-3M4 13H1m5.56-7.19L5.5 4.75m1.06 15L5.5 20.81m14.25-15 1.06-1.06m-1.06 15 1.06 1.06M19 13a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z'
      stroke='url(#a)'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Defs>
      <LinearGradient
        id='a'
        x1={13}
        y1={1}
        x2={13}
        y2={25}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={0} stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SunBtn;
