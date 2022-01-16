import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { TestContainer } from '../testing';
import { NeuroEditor } from './Editor';

export default {
  title: 'Editor',
  component: NeuroEditor,
} as ComponentMeta<typeof NeuroEditor>;

const Template: ComponentStory<typeof NeuroEditor> = () => (
  <TestContainer>
    <NeuroEditor />
  </TestContainer>
);

export const Primary = Template.bind({});
Primary.args = {};
