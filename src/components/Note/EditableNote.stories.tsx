import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { RootContainer } from '../common';
import { EditableNote } from './EditableNote';

export default {
  title: 'Editor',
  component: EditableNote,
} as ComponentMeta<typeof EditableNote>;

const Template: ComponentStory<typeof EditableNote> = () => (
  <RootContainer>
    <EditableNote data={{ id: 'id', text: '', createdAt: Date.now() }} />
  </RootContainer>
);

export const Primary = Template.bind({});
Primary.args = {};
