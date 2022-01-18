import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { TestContainer } from '../../testing';
import { EditableNote } from './EditableNote';

export default {
  title: 'Editor',
  component: EditableNote,
} as ComponentMeta<typeof EditableNote>;

const Template: ComponentStory<typeof EditableNote> = () => (
  <TestContainer>
    <EditableNote data={{ id: 'id', text: '', createdAt: Date.now() }} />
  </TestContainer>
);

export const Primary = Template.bind({});
Primary.args = {};
