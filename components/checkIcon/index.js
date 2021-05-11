import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg data-name="Capa 1" viewBox="0 0 367.8 367.8" {...props}>
      <Path
        d="M183.9 0c101.57 0 183.9 82.34 183.9 183.9a183.89 183.89 0 01-183.9 183.9C82.34 367.8 0 285.47 0 183.9-.29 82.62 81.58.29 182.86 0z"
        fill="#3bb54a"
      />
      <Path
        fill="#d4e1f4"
        d="M285.78 133.22L155.17 263.84l-73.14-72.62 29.78-29.26 43.36 42.84L256 103.97l29.78 29.25z"
      />
    </Svg>
  )
}

export default SvgComponent