export class Login {
  static readonly type = 'login';
  constructor(public username: string) {}
}

export class Logout {
  static readonly type = 'logout';
}
