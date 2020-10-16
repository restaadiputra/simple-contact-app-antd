const ADD_CONTACT = 'contact/add_contact';
const UPDATE_CONTACT = 'contact/update_contact';
const DELETE_CONTACT = 'contact/delete_contact';

const initialState = [];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return [...state, ...action.payload];

    case UPDATE_CONTACT:
      return state.map((contact) => {
        if (contact.id === action.payload.id) {
          return { ...contact, ...action.payload };
        }
        return contact;
      });

    case DELETE_CONTACT:
      return state.filter((contact) => contact.id !== action.id);

    default:
      return state;
  }
};

export const addContact = (payload) => ({
  type: ADD_CONTACT,
  payload,
});

export const updateContact = (payload) => ({
  type: UPDATE_CONTACT,
  payload,
});

export const deleteContact = (id) => ({
  type: DELETE_CONTACT,
  id,
});

export default contactReducer;
