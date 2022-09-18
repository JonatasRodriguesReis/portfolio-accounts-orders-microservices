export interface CreateAccountDTO {
  name: string;
}

export interface OutputAccountDTO {
  id: string;
  name: string;
  token: string;
}

export interface UpdateAccountDTO {
  name?: string;
  token?: string;
}
