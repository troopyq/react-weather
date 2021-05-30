import { memo } from "react"

const City = memo(({city}) => {
  return (
    <div className="city">
      {city}
    </div>
  )
})

export default City
