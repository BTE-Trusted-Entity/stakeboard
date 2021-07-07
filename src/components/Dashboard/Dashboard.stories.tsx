import { Story, Meta } from '@storybook/react'

import { Dashboard, Props } from './Dashboard'
import { Account } from './types'

export default {
  title: 'Dashboard',
  component: Dashboard,
  argTypes: {
    staked1: {
      table: {
        category: '1st Account',
      },
      control: { type: 'range', min: 0, max: 300000, step: 50 },
    },
    stakeable1: {
      table: {
        category: '1st Account',
      },
      control: { type: 'range', min: 0, max: 300000, step: 50 },
    },
    staked2: {
      table: {
        category: '2nd Account',
      },
      control: { type: 'range', min: 0, max: 300000, step: 50 },
    },
    stakeable2: {
      table: {
        category: '2nd Account',
      },
      control: { type: 'range', min: 0, max: 300000, step: 50 },
    },
  },
} as Meta

interface PropsWithCustom extends Props {
  staked1: number
  stakeable1: number
  staked2: number
  stakeable2: number
}

const Template: Story<PropsWithCustom> = ({
  staked1,
  stakeable1,
  staked2,
  stakeable2,
  accounts,
  ...args
}) => {
  accounts[0].staked = staked1
  accounts[0].stakeable = stakeable1
  accounts[1].staked = staked2
  accounts[1].stakeable = stakeable2
  return <Dashboard accounts={accounts} {...args} />
}

const accounts: Account[] = [
  {
    address: '5HTySzbJiBYuJow2ZKSHJTnMHF14S8oNnkkEBzzhyqaAPTAH',
    name: 'KILT Identity 1',
    staked: 14_000,
    stakeable: 8_000,
    used: true,
  },
  {
    address: '5DLYuqjWyEFWF6c4oVDh62L4cPZajvupNj6uUNS4tBSux3ay',
    name: 'KILT Identity 2',
    staked: 5_000,
    stakeable: 16_000,
    used: true,
  },
  {
    address: '5G1CE7waPWQCoUWLmK3NMh5gV6D8gdc1WDe2G8yST4tc9y3o',
    name: 'KILT Identity 3',
    staked: 9_000,
    stakeable: 0,
    used: true,
  },
  {
    address: '5GeWZ6BU2bWN66B6YY7L7X75DXZ9ow6S6TUmcTEfn2DnF9mq',
    name: 'KILT Identity 4',
    staked: 0,
    stakeable: 5000,
    used: false,
  },
  {
    address: '5DNri3hjVUjPZ5QHyGfEGfHTju4gsuXMndHVDsHSTE7vLkg1',
    name: 'KILT Identity 5',
    staked: 0,
    stakeable: 8000,
    used: false,
  },
]

export const Primary = Template.bind({})
Primary.args = {
  accounts,
  staked1: 14_000,
  stakeable1: 8_000,
  staked2: 5_000,
  stakeable2: 16_000,
}
