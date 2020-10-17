import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileContactList from '../mobile-contact-list';

const onEdit = jest.fn();
const onDelete = jest.fn();

const data = [
  {
    id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
    firstName: 'Bilbo',
    lastName: 'Baggins',
    age: 111,
    photo: 'testing.jpg',
  },
];

beforeEach(() => {
  render(
    <MobileContactList data={data} onEdit={onEdit} onDelete={onDelete} />
  );
});

test('should render data', () => {
  expect(screen.getByText(data[0].firstName + ' ' + data[0].lastName)).toBeInTheDocument();
  expect(screen.getByText(data[0].age + ' years old')).toBeInTheDocument();
});

test('should call "onEdit" and "onDelete" props when menu item is click', () => {
  const menu = screen.getByTestId('menu');
  fireEvent.click(menu);
  const editButton = screen.queryByTestId('edit');
  fireEvent.click(editButton);

  fireEvent.click(menu);
  const deleteButton = screen.queryByTestId('delete');
  fireEvent.click(deleteButton);

  expect(onEdit).toHaveBeenCalledTimes(1);
  expect(onDelete).toHaveBeenCalledTimes(1);
});
