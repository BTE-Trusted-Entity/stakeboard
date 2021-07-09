import { Story, Meta } from '@storybook/react'

import { CollatorList, Props } from './CollatorList'

export default {
  title: 'CollatorList',
  component: CollatorList,
  argTypes: {},
} as Meta

const Template: Story<Props> = (args) => <CollatorList {...args} />

export const Primary = Template.bind({})
Primary.args = {
  accounts: [
    {
      address: '5F1P7WAgEkh7YWCHCBcnBx8Gvx2VbCMrjezUjiJRoZmmR464',
      name: "KILT Identity 1",
      stakeable: 100_000,
      staked: 0
    },
    {
      address: '5GN6CNx5L44Ga372PvyD639ukHTvoUktkDCNL4rY7sEFy57P',
      name: "KILT Identity 2",
      stakeable: 800_000,
      staked: 0
    },
    {
      address: '5D7WMHRftdGWGhfAP7NaJfKuRyvfES77ZnjcBzqgMFMjTsGu',
      name: "KILT Identity 3",
      stakeable: 10_000,
      staked: 0
    }
  ],
  dataSet: [
    {
      collator: '5HTySzbJiBYuJow2ZKSHJTnMHF14S8oNnkkEBzzhyqaAPTAH',
      active: true,
      activeNext: false,
      isLeaving: false,
      totalStake: 200_000,
      delegators: 5,
      lowestStake: 10_000,
      stakes: [],
      favorite: true
    },
    {
      collator: '5DLYuqjWyEFWF6c4oVDh62L4cPZajvupNj6uUNS4tBSux3ay',
      active: true,
      activeNext: true,
      isLeaving: false,
      totalStake: 400_000,
      delegators: 15,
      lowestStake: 15_000,
      stakes: [
        {
          stake: 100_000,
          account: {
            name: 'SPORRAN Account 3',
            address: '5CUaCwjWpEk9nDxrmurkeYuVeYNqFyfBB9chk3cHqd54vTBk',
            available: 200_000,
          },
        },
      ],
      favorite: false
    },
    {
      collator: '5GQtYZsBDvgXq2KSffpN9HWxtK8rxG4gk1jWSp5MaDb1gurR',
      active: true,
      activeNext: true,
      isLeaving: true,
      totalStake: 600_000,
      delegators: 25,
      lowestStake: 20_000,
      stakes: [],
      favorite: false
    },
  ]
}
