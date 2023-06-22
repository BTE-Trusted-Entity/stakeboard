import React from 'react'
import { Select, Props as SelectProps } from '../../components/Select/Select'
import { Account } from '../../types'
import { format } from '../../utils'

export interface Props {
  onChange?: SelectProps['onChange']
  value?: SelectProps['value']
  accounts: Account[]
}

export const IdentitySelector: React.FC<Props> = ({
  onChange,
  value,
  accounts,
}) => {
  const options = accounts
    .filter((account) => account.staked === 0)
    .map((account) => ({
      value: account.address,
      label: `${account.name} (Stakeable: ${format(account.stakeable)})`,
    }))
  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      placeholder={'Select Identity'}
    />
  )
}
