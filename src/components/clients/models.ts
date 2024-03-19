export type Customer = {
  firstName: string;
  lastName: string;
  companyName: string;
  contactDetails: string;
  email: string;
};

export type ClientDto = Customer & {
  id: string;
  avatar: string | undefined;
};

export type ClientForm = Customer & {
  companyAddress: string;
};
