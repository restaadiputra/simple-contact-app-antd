import React from 'react';
import { render } from '@testing-library/react';
import { Context as ResponsiveContext } from 'react-responsive';
import Contact from '../contact';

test('should render without error', () => {
  const data = [
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo: 'testing.jpg',
    },
  ];

  const { getByText } = render(<Contact />);

  expect(getByText(/contact/i)).toBeInTheDocument();

  const { container: mobile } = render(
    <ResponsiveContext.Provider value={{ width: 640 }}>
      <Contact data={data} />
    </ResponsiveContext.Provider>
  );
  expect(mobile).toMatchSnapshot();

  const { container: desktop } = render(
    <ResponsiveContext.Provider value={{ width: 1000 }}>
      <Contact data={data} />
    </ResponsiveContext.Provider>
  );
  expect(desktop).toMatchSnapshot();
});
