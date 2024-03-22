import { Meta, StoryObj } from '@storybook/angular';

import { AhorramasComponent } from './ahorramas.component';

type ComponentWithCustomControls = AhorramasComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Ahorramas',
  component: AhorramasComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Ahorramas` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Ahorramas: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
