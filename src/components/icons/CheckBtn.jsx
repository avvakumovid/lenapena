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
    width={126}
    height={101}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M5 56.435 40.151 96 121 5'
      stroke='url(#a)'
      strokeWidth={10}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <Defs>
      <LinearGradient
        id='a'
        x1={63}
        y1={5}
        x2={63}
        y2={96}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CheckBtn;
