import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg data-name="Capa 1" viewBox="0 0 387.4 387.4" {...props}>
      <Path
        d="M193.7 0C86.9 0 0 86.9 0 193.7s86.9 193.7 193.7 193.7 193.7-86.9 193.7-193.7S300.5 0 193.7 0zm0 367.4C97.9 367.4 20 289.5 20 193.7S97.9 20 193.7 20s173.7 77.9 173.7 173.7-77.9 173.7-173.7 173.7z"
        fill="#aaa"
      />
      <Path
        d="M302.2 136.2l-29.4-29.5a10 10 0 00-14.1 0l-93.8 93.8-36-36a10 10 0 00-14.1 0L85.4 194a10 10 0 000 14.1l72.6 72.6a10 10 0 0014.1 0l130.1-130.4a10 10 0 000-14.1zM164.8 259.5l-58.4-58.4 15.3-15.4 36 36a10 10 0 0014.1 0l93.9-93.8 15.3 15.3z"
        fill="#aaa"
      />
    </Svg>
  )
}

export default SvgComponent
