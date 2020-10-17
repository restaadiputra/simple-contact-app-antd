import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './form';

const data = {
  firstName: 'testingfirst',
  lastName: 'testinglast',
  age: 2,
  photo: 'photo.jpg',
};

const backToList = jest.fn();
const onFinish = jest.fn();

test('should render without error', () => {
  render(
    <Form
      title="Add Contact"
      backToList={backToList}
      onFinish={onFinish}
      loading={false}
      submitText="Add"
    />
  );

  expect(screen.queryByText('Add').childNodes.length).toBe(1);
  expect(screen.queryByText('Add Contact').childNodes.length).toBe(1);

  fireEvent.click(screen.getByText('Cancel'));
  expect(backToList).toHaveBeenCalledTimes(1);
});

test('should set empty value if no data is available', () => {
  render(
    <Form
      title="Add Contact"
      backToList={backToList}
      onFinish={onFinish}
      loading={false}
      submitText="Add"
    />
  );

  expect(screen.getByPlaceholderText('your first name').value).toBe('');
  expect(screen.getByPlaceholderText('your last name').value).toBe('');
  expect(screen.getByPlaceholderText('your age').value).toBe('');
  expect(
    screen.getByPlaceholderText('your link to your photo profile').value
  ).toBe('');
});
test('should set the value from data', async () => {
  render(
    <Form
      title="Edit Contact"
      backToList={backToList}
      onFinish={onFinish}
      loading={false}
      submitText="Edit"
      data={data}
    />
  );

  expect(screen.getByPlaceholderText('your first name').value).toBe(
    data.firstName
  );
  expect(screen.getByPlaceholderText('your last name').value).toBe(
    data.lastName
  );
  expect(screen.getByPlaceholderText('your age').value).toBe(data.age + '');
  expect(
    screen.getByPlaceholderText('your link to your photo profile').value
  ).toBe(data.photo);

  userEvent.click(screen.getByText('Edit'))
  await waitFor(() =>  expect(onFinish).toBeCalledTimes(1));
  expect(onFinish).toBeCalledWith(data);
});

describe('form validation', () => {
  test('should show error for first name validation', async () => {
    render(
      <Form
        title="Add Contact"
        backToList={backToList}
        onFinish={onFinish}
        loading={false}
        submitText="Add"
      />
    );

    const submitBtn = screen.getByText('Add');

    userEvent.click(submitBtn);
    await waitFor(() => screen.getByText('Please input your first name!'));

    userEvent.type(screen.getByPlaceholderText(/first name/i), 'a');
    await waitFor(() =>
      screen.getByText('First name must be 3 or more letters')
    );

    userEvent.type(screen.getByPlaceholderText(/first name/i), '__');
    await waitFor(() => screen.getByText('First name can only alphanumeric'));
  });

  test('should show error for last name validation', async () => {
    render(
      <Form
        title="Add Contact"
        backToList={backToList}
        onFinish={onFinish}
        loading={false}
        submitText="Add"
      />
    );

    const submitBtn = screen.getByText('Add');

    userEvent.click(submitBtn);
    await waitFor(() => screen.getByText('Please input your last name!'));

    userEvent.type(screen.getByPlaceholderText(/last name/i), 'a');
    await waitFor(() =>
      screen.getByText('Last name must be 3 or more letters')
    );

    userEvent.type(screen.getByPlaceholderText(/last name/i), '__');
    await waitFor(() => screen.getByText('Last name can only alphanumeric'));
  });

  test('should show error for age validation', async () => {
    render(
      <Form
        title="Add Contact"
        backToList={backToList}
        onFinish={onFinish}
        loading={false}
        submitText="Add"
      />
    );

    const submitBtn = screen.getByText('Add');

    userEvent.click(submitBtn);
    await waitFor(() => screen.getByText('Please input your age!'));

    userEvent.type(screen.getByPlaceholderText(/age/i), '-');
    await waitFor(() => screen.getByText('Age can only be positive number'));

    userEvent.type(screen.getByPlaceholderText(/age/i), '0');
    await waitFor(() =>
      screen.getByText('Age must be larger than 0 and less or equal to 100')
    );

    userEvent.type(screen.getByPlaceholderText(/age/i), '101');
    await waitFor(() =>
      screen.getByText('Age must be larger than 0 and less or equal to 100')
    );
  });
});
