export class user {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  sendAutomaticPasswordTo: string;
  id: string;
  status: string;
  lastSignIn: string;
  Name?() {
    return this.firstName + ' ' + this.lastName;
  }
}
