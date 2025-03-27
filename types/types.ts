export type TokenResponse = {
  access_token: string,
}

export type User = {
  name: string,
  surname: string,
  created: string,
  _comment: string,
  credentials: Credentials,
  active: boolean,
}

export type Credentials = {
  username: string,
  passphrase: string,
}

export type Item = {
  id: number,
  status: string,
  date_created: string,
  name: string,
  category: string,
  price: number,
  rarity: string,
  condition: string,
  stock: number
}

export type LoginFormErrors = {
  email: string,
  password: string,
}

export type AuthStateFilters = {
  startDate: string,
  endDate: string,
}