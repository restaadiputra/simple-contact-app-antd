import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  const { getByText, getByTestId, queryByTestId } = render(
    <MobileContactList data={data} />
  );
  expect(
    getByText(data[0].firstName + ' ' + data[0].lastName)
  ).toBeInTheDocument();
  expect(getByText(data[0].age + ' years old')).toBeInTheDocument();

  const menu = getByTestId('menu');
  fireEvent.click(menu);
  const editButton = queryByTestId('edit');
  fireEvent.click(editButton);

  fireEvent.click(menu);
  const deleteButton = queryByTestId('delete');
  fireEvent.click(deleteButton);
});
