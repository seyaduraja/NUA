

interface Props {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}

function QuantitySelect({ value, onChange, min = 1, max = 10 }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  )
}

export default QuantitySelect