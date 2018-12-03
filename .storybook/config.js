import { configure, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import '../src/index.scss';

addDecorator(StoryRouter());

const req = require.context('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
