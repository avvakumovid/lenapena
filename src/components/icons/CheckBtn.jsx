import * as React from 'react';
import Svg, { Rect, Path, LinearGradient, Defs, Stop } from 'react-native-svg';

const CheckBtn = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    width={120}
    height={120}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M7 65.348 38.818 101 112 19'
      stroke='url(#a)'
      strokeWidth={10}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Defs>
      <LinearGradient
        id='a'
        x1={59.5}
        y1={19}
        x2={59.5}
        y2={101}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CheckBtn;
