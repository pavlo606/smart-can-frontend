import { useEffect, useState } from 'react'
import Select, { type MenuPlacement, type StylesConfig, type SingleValue } from 'react-select'

type OptionType = {
  value: any
  label: string
}

interface SelectProps {
  options: OptionType[]
  className?: string
  menuPlacement?: MenuPlacement
  defaultInputValue?: any
  value?: any
  disabled?: boolean
  isSearchable?: boolean
  onChange?: (_: OptionType) => void
}

const customStyles: StylesConfig<OptionType> = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: state.isDisabled ? 'oklch(98.5% 0.002 247.839)' : 'white',
    borderColor: state.isDisabled ? 'oklch(92.8% 0.006 264.531)' : 'black',
    borderRadius: '0.375rem',
    transition: '0.5s',
    ":hover": {
      borderColor: 'gray'
    },
    fontSize: "var(--text-sm)",
    lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
  }),
  option: (styles) => {
    return {
      ...styles,
      positionAnchor: 'auto',
      fontSize: "var(--text-sm)",
      lineHeight: "var(--tw-leading, var(--text-sm--line-height))",
    }
  },
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles) => ({ ...styles }),
}

const CustomSelect = ({
  options,
  className,
  menuPlacement,
  defaultInputValue,
  value,
  disabled,
  isSearchable,
  onChange,
  ...params
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<OptionType>(defaultInputValue ?? options[0])

  useEffect(() => {
    setSelectedValue(options.find((v) => v.value === value) ?? options[0])
  }, [value, options])

  const handleChange = (newValue: SingleValue<OptionType>) => {
    setSelectedValue(newValue ?? options[0])
    if (onChange) {
      onChange(newValue ?? options[0])
    }
  }

  return (
    <Select<OptionType>
      options={options}
      styles={customStyles}
      menuPlacement={menuPlacement}
      defaultInputValue={defaultInputValue}
      value={selectedValue}
      onChange={handleChange}
      isDisabled={disabled}
      isSearchable={isSearchable}
      {...params}
    />
  )
}

export default CustomSelect
