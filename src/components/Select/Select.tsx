import React from 'react'
import ReactSelect from 'react-select'
import './ReactSelect.css'

export interface Option {
  value: string
  label: string
}
export interface Props {
  options: readonly Option[]
  onChange?: (value: Option | null) => void
}

const IndicatorSeparator = null

export const Select: React.FC<Props> = ({ options, onChange }) => {
  return (
    <ReactSelect
      options={options}
      // menuIsOpen={true}
      components={{ IndicatorSeparator }}
      placeholder="Select KILT Identity"
      className={'Select'}
      classNamePrefix="s"
      onChange={onChange}
      theme={theme => ({
        ...theme,
        spacing: {
          ...theme.spacing,
          controlHeight: 30,
          baseUnit: 2
        }
      })}
    />
  )
}
