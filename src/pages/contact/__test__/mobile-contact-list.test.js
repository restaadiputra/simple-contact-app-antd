import React from 'react';
import { render } from '@testing-library/react';
import MobileContactList from '../mobile-contact-list';

test('should render data', () => {
  const data = [
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo: 'testing.jpg',
    },
  ];

  const onEdit = jest.fn();
  const onDelete = jest.fn();

  const { getByText } = render(
    <MobileContactList data={data} onEdit={onEdit} onDelete={onDelete} />
  );
  expect(
    getByText(data[0].firstName + ' ' + data[0].lastName)
  ).toBeInTheDocument();
  expect(getByText(data[0].age + ' years old')).toBeInTheDocument();

});
