import type { Meta, StoryObj} from '@storybook/react'
import SearchBar  from '../components/SearchBar'
import { fn } from '@storybook/test';

const meta: Meta<typeof SearchBar> = {
    component: SearchBar,
    args: {
        onSearch: fn(),

    }
};
export default meta
type Story = StoryObj<typeof SearchBar>;
export const Default: Story = {};