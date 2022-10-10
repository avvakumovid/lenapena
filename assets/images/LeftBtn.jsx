import * as React from 'react';
import Svg, { Rect, Path, Stop, Defs, LinearGradient } from 'react-native-svg';

const LeftBtn = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    width={13}
    height={26}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M11.286 25 1 13 11.286 1'
      stroke='url(#a)'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Defs>
      <LinearGradient
        id='a'
        x1={6.143}
        y1={1}
        x2={6.143}
        y2={25}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default LeftBtn;
