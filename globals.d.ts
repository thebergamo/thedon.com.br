import { Session as AuthSession } from 'next-auth'
// Declaring this interface provides type safety for message keys
type Messages = typeof import('./messages/en-US.json')
declare interface IntlMessages extends Messages {}

declare type Session = AuthSession & {
  jwt: any
}
