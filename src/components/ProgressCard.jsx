import { Card, CardBody, CardFooter } from '@nextui-org/react'
import { CircularProgress, Chip } from '@nextui-org/react'

const ProgressCard = ({ title, value, isSecond = false, isPercent = false }) => {
  let valueLabel = value

  if (isSecond) valueLabel = `${value}s`
  if (isPercent) valueLabel = `${value}%`

  return (
    <Card className="w-[180px] h-[180px] border-none bg-gradient-to-br from-indigo-500 to-cyan-500">
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: 'w-32 h-32 drop-shadow-md',
            value: 'text-3xl font-semibold text-white',
            indicator: 'stroke-white',
            track: 'stroke-white/10'
          }}
          aria-label="Time"
          showValueLabel={true}
          valueLabel={valueLabel}
          value={value}
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
