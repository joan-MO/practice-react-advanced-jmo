import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NewAdvertForm from './NewAdvertForm';

configure({adapter: new Adapter()});

describe('NewAdvertForm', () => {
  const props = {
    onSubmit: jest.fn(),
  };

  const render = () => shallow(<NewAdvertForm {...props} />);
  
  test('snapshot testing', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

});
