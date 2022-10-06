import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

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
      stroke={externalBorderColor}
      strokeWidth={10}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </Svg>
);

export default CheckBtn;
