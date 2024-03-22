import { Meta, StoryObj } from '@storybook/angular';

import { CarrefourComponent } from './carrefour.component';

type ComponentWithCustomControls = CarrefourComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Carrefour',
  component: CarrefourComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Carrefour` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Carrefour: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
