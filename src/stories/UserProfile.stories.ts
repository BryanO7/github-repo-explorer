import type { Meta, StoryObj} from '@storybook/react'
import UserProfile  from '../components/UserProfile'

const meta: Meta<typeof UserProfile> = {
    component: UserProfile,

};
export default meta
type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {};
export const Mvst: Story= {
    args:{
        owner: {
            login: 'Interview',
            avatar_url: 'https://cdn.join.com/5f96ee0cac6693000144cccb/mvst-logo-xl.png',
            id:222,
            node_id:'mvst222',
            html_url:'https://www.google.com/imgres?q=mvst222',
        }
    }
};
export const Octocat: Story = {
    args: {
        owner: {
            login: 'octocat',
            avatar_url: 'https://github.com/octocat.png',
            id: 123,
            node_id: 'abc123',
            html_url: 'https://github.com/octocat'
        }
    }
};
