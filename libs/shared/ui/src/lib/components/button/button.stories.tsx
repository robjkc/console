import { Button, ButtonProps, ButtonSize, ButtonType } from './button'
import { select } from '@storybook/addon-knobs'
import { Meta, Story } from '@storybook/react'
import { IconEnum } from '../../enums/icon.enum'

export default {
  component: Button,
  title: 'Button',
} as Meta

const ButtonContent = () => {
  return <span>Button</span>
}

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>
    <ButtonContent />
  </Button>
)

export const Primary = Template.bind({})
Primary.args = {
  size: select('Size', ButtonSize, ButtonSize.NORMAL),
  type: select('Type', ButtonType, ButtonType.BASIC),
  iconLeft: select('Icon Left', IconEnum, undefined),
  iconRight: select('Color', IconEnum, undefined),
}