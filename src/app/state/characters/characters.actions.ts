export class GetCharacters {
  static readonly type = 'getCharacters';

  constructor(public page: number, public table?: boolean) {}
}
