export class Payload {
  constructor(attrs: any) {
    if (!attrs) {
      attrs = {};
    }
    (<any>Object).assign(this, attrs);
  }

  asJSON(): any {
    return this;
  }
}
