import * as React from 'react';
import Svg, { Rect, Path, Stop, Defs, LinearGradient } from 'react-native-svg';

const RightBtn = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    width={13}
    height={27}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='m1 25.32 10.423-12.16L1 1'
      stroke='url(#a)'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Defs>
      <LinearGradient
        id='a'
        x1={6.211}
        y1={1}
        x2={6.211}
        y2={25.32}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default RightBtn;
