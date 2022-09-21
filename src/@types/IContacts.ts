export type Contact = {
  name: string;
  email: string;
  phone: string;
  id: string;
};

export interface IContacts {
  contacts: Contact[];
  searchList: Contact[];
  search: string;
}
