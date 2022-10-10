import * as React from 'react';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const StartBtn = ({
  style,
  externalBorderColor,
  internalBorderColor,
  contentColor,
  ...props
}) => (
  <Svg
    style={style}
    width={256}
    height={101}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M73.402 50.767H60.336l-2.11 12.618h-3.261l4.453-26.66h3.262l-1.875 11.21H73.87l1.875-11.21h3.262l-4.473 26.66h-3.242l2.11-12.618Zm23.602 4.805h-9.727l-3.828 7.813h-3.027l13.066-26.66h3.692l4.648 26.66h-3.437l-1.387-7.813Zm-.39-2.676L94.561 40.65l-6.015 12.246h8.066Zm23.659 10.489 2.129-12.774c-2.317 2.448-5.039 3.672-8.164 3.672-2.135 0-3.789-.553-4.961-1.66-1.159-1.107-1.738-2.65-1.738-4.629 0-.547.091-1.367.273-2.46l1.465-8.81h3.262l-1.523 9.083c-.131.794-.196 1.432-.196 1.914 0 1.145.358 2.076 1.075 2.793.729.716 1.868 1.074 3.417 1.074 2.943 0 5.437-1.094 7.481-3.282l1.934-11.581h3.261l-4.453 26.66h-3.262Zm25.692-7.813h-9.727l-3.828 7.813h-3.027l13.066-26.66h3.692l4.648 26.66h-3.437l-1.387-7.813Zm-.391-2.676-2.051-12.246-6.015 12.246h8.066Zm28.504-13.457h-7.715l-4.023 23.946h-3.242l4.004-23.946h-7.735l.449-2.715h18.731l-.469 2.715Zm1.746 23.946 4.453-26.66h3.262l-1.777 10.663h5.41c1.914 0 3.424.19 4.531.567 1.107.364 1.986 1.074 2.637 2.129.664 1.041.996 2.383.996 4.023 0 2.54-.755 4.72-2.266 6.543-1.51 1.823-4.043 2.735-7.597 2.735h-9.649Zm3.731-2.832h6.25c2.343 0 3.952-.619 4.824-1.856.885-1.25 1.328-2.708 1.328-4.375 0-1.159-.286-2.129-.859-2.91-.573-.794-1.927-1.191-4.063-1.191h-5.762l-1.718 10.332Z'
      fill='url(#a)'
    />
    <Rect
      x={1.5}
      y={1.5}
      width={253}
      height={97.778}
      rx={48.889}
      stroke='url(#b)'
      strokeWidth={3}
    />
    <Defs>
      <LinearGradient
        id='a'
        x1={128}
        y1={39.385}
        x2={128}
        y2={62.552}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
      <LinearGradient
        id='b'
        x1={128}
        y1={0}
        x2={128}
        y2={100.778}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor={externalBorderColor} />
        <Stop offset={1} stopColor={internalBorderColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default StartBtn;
