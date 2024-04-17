import { HOUR_INDICATOR, MINUTE_INDICATOR } from '../constants/design'
import { MILLISECOND_LIMIT, SECOND_LIMIT, MINUTE_LIMIT } from '../constants/design'
import { MILLISECOND_INDICATOR, SECOND_INDICATOR } from '../constants/design'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import { CircularProgress, Chip } from '@nextui-org/react'

const ProgressCard = ({ title, value, isTime = false, isPercent = false }) => {
  let valueLabel = value

  if (isTime) {
    let indicator = HOUR_INDICATOR

    if (value < MILLISECOND_LIMIT) {
      indicator = MILLISECOND_INDICATOR
    } else if (value < SECOND_LIMIT) {
      indicator = SECOND_INDICATOR
    } else if (value < MINUTE_LIMIT) {
      indicator = MINUTE_INDICATOR
    }

    valueLabel = `${value}${indicator}`
  }

  if (isPercent) valueLabel = `${value}%`

  return (
    <Card className="w-[180px] h-[180px] border-none bg-gradient-to-br from-indigo-500 to-cyan-500">
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: 'w-32 h-32 drop-shadow-md',
            value: 'text-2xl font-semibold text-white',
            indicator: 'stroke-white',
            track: 'stroke-white/10'
          }}
          aria-label="Time"
          showValueLabel={true}
          valueLabel={valueLabel}
          value={value}
          maxValue={10}
        />
      </CardBody>

      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: 'border-1 border-white/30',
            content: 'text-white/90 text-small font-semibold'
          }}
          variant="bordered"
        >
          {title}
        </Chip>
      </CardFooter>
    </Card>
  )
}

export default ProgressCard
