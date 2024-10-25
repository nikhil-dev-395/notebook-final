import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg";

const CheckListIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={props.width} height={props.height} color="#000000" fill="none" {...props}>
    <Path d="M11 6L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M11 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M11 18L21 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default CheckListIcon;
