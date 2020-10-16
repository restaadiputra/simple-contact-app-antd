import contact, { addContact, updateContact, deleteContact } from '../contact';

const contactList = [
  {
    id: '111111111111',
    firstName: 'fName1',
    lastName: 'lName1',
    age: 11,
    photo: 'testing1.png',
  },
  {
    id: '22222222222',
    firstName: 'fName2',
    lastName: 'lName2',
    age: 22,
    photo: 'testing2.png',
  },
  {
    id: '33333333333',
    firstName: 'fName3',
    lastName: 'lName3',
    age: 33,
    photo: 'testing3.png',
  },
];

const updatedContact = {
  id: '22222222222',
  firstName: 'fName22',
  lastName: 'lName22',
  age: 22,
  photo: 'testing2.png',
};

test('should handle initial state', () => {
  expect(contact(undefined, {})).toEqual([]);
});

test('should add new contact', () => {
  expect(contact([], addContact([contactList[0]]))).toEqual([contactList[0]]);

  expect(contact([contactList[0]], addContact([contactList[1]]))).toEqual([
    contactList[0],
    contactList[1],
  ]);

  expect(
    contact([contactList[0], contactList[1]], addContact([contactList[2]]))
  ).toEqual(contactList);
});

test('should update contact by id', () => {
  const updatedContactList = contact(
    contactList,
    updateContact(updatedContact)
  );

  expect(updatedContactList[1].firstName).toBe(updatedContact.firstName);
  expect(updatedContactList[1].lastName).toBe(updatedContact.lastName);
});

test('should delete contact by id', () => {
  expect(contact(contactList, deleteContact(contactList[2].id))).toEqual([
    contactList[0],
    contactList[1],
  ]);
});
