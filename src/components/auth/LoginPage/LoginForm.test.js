import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoginForm from './LoginForm';

configure({adapter: new Adapter()});

describe('LoginForm', () => {
  const props = {
    isLoading: false,
    onSubmit: jest.fn(),
  };

  const render = () => shallow(<LoginForm {...props} />);
  
  test('snapshot testing', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

});
