export type UpdateForm = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

export type UpdateUser = UpdateForm & {
  photo?: File;
  uid: string;
};
