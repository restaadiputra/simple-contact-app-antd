import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Fab from './fab';

test('should call "onClick" when button was clicked', () => {
  const onClick = jest.fn();
  render(<Fab onClick={onClick} />);

  fireEvent.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
});
