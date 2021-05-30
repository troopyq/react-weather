import { memo } from "react"
import AnimatedNumber from "react-animated-numbers"

const Temperature = memo(({temp}) => {
  return (
    <div className="temperature">
          <AnimatedNumber
            animateToNumber={temp}
            animationType={"random"}
          />
        </div>
  )
})

export default Temperature
