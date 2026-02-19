import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  DateInputGroup,
  DateInputGroupValue,
  FormFieldset,
  FormFieldLegend,
  FormFieldDescription,
  FormFieldErrorMessage,
} from '@dsn/components-react';
import DocsPage from './DateInputGroup.docs.mdx';

const meta: Meta<typeof DateInputGroup> = {
  title: 'Components/DateInputGroup',
  component: DateInputGroup,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    invalid: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof DateInputGroup>;

function DefaultStory(args: React.ComponentProps<typeof DateInputGroup>) {
  const [value, setValue] = useState<DateInputGroupValue>({
    day: '',
    month: '',
    year: '',
  });
  return (
    <DateInputGroup {...args} id="datum" value={value} onChange={setValue} />
  );
}

function WithValueStory(args: React.ComponentProps<typeof DateInputGroup>) {
  const [value, setValue] = useState<DateInputGroupValue>({
    day: '15',
    month: '03',
    year: '1990',
  });
  return (
    <DateInputGroup {...args} id="datum" value={value} onChange={setValue} />
  );
}

function WithFormFieldsetStory(
  args: React.ComponentProps<typeof DateInputGroup>
) {
  const [value, setValue] = useState<DateInputGroupValue>({
    day: '',
    month: '',
    year: '',
  });
  return (
    <FormFieldset>
      <FormFieldLegend>Geboortedatum</FormFieldLegend>
      <FormFieldDescription>Bijvoorbeeld: 15 3 1990</FormFieldDescription>
      <DateInputGroup
        {...args}
        id="geboortedatum"
        value={value}
        onChange={setValue}
      />
    </FormFieldset>
  );
}

function InvalidStory(args: React.ComponentProps<typeof DateInputGroup>) {
  const [value, setValue] = useState<DateInputGroupValue>({
    day: '31',
    month: '02',
    year: '1990',
  });
  return (
    <FormFieldset>
      <FormFieldLegend>Geboortedatum</FormFieldLegend>
      <DateInputGroup
        {...args}
        id="geboortedatum"
        value={value}
        onChange={setValue}
        invalid
        aria-describedby="geboortedatum-error"
      />
      <FormFieldErrorMessage id="geboortedatum-error">
        Voer een geldige datum in
      </FormFieldErrorMessage>
    </FormFieldset>
  );
}

export const Default: Story = { render: (args) => <DefaultStory {...args} /> };

export const WithValue: Story = {
  name: 'With value',
  render: (args) => <WithValueStory {...args} />,
};

export const WithFormFieldset: Story = {
  name: 'With FormFieldset (complete form field)',
  render: (args) => <WithFormFieldsetStory {...args} />,
};

export const Invalid: Story = {
  render: (args) => <InvalidStory {...args} />,
};

export const Disabled: Story = {
  render: (args) => (
    <FormFieldset>
      <FormFieldLegend>Geboortedatum</FormFieldLegend>
      <DateInputGroup
        {...args}
        id="geboortedatum"
        value={{ day: '15', month: '03', year: '1990' }}
        disabled
      />
    </FormFieldset>
  ),
};
