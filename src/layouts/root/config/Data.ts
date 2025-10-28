import type { DataCheckBox } from '@/modules/types';

export const dataCheckBox: DataCheckBox[] = [
  { children: 'Default' },
  { children: 'Hover' },
  { children: 'Focused', props: { autoFocus: true } },
  { children: 'Checked', props: { defaultChecked: true } },
  { children: 'Disabled', props: { disabled: true } },
  {
    children: 'Disabled Checked',
    props: {
      disabled: true,
      defaultChecked: true,
    },
  },
];
