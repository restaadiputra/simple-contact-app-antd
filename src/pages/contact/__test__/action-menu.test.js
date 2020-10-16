import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ActionMenu from '../action-menu';

test('should render without error', () => {
  render(<ActionMenu />);
});

test('should call "onEdit" and "onDelete" when menu item is click', async () => {
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  const { container, queryByTestId } = render(
    <ActionMenu onEdit={onEdit} onDelete={onDelete} />
  );
  const menu = container.firstChild;

  fireEvent.click(menu);
  const editButton = queryByTestId('edit');
  fireEvent.click(editButton);

  fireEvent.click(menu);
  const deleteButton = queryByTestId('delete');
  fireEvent.click(deleteButton);

  expect(onEdit).toHaveBeenCalledTimes(1);
  expect(onDelete).toHaveBeenCalledTimes(1);
});
