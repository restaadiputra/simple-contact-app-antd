import loadable from 'utils/loadable';

export const ContactPage = loadable(() => import('./contact'));
export const AddContactPage = loadable(() => import('./add-contact'));
export const EditContactPage = loadable(() => import('./edit-contact'));
