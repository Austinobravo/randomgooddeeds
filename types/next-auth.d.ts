import {
  Account,
  KYC,
  Notification,
  RequestSupport,
  Subscription,
  Ticket,
  Transaction,
  UserType,
  TicketReply,
} from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
      isAdmin: boolean;
      username: string

    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    username: string
    firstName: string | null;
    lastName: string | null;

  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    isAdmin: boolean;
    username: string


  }
}
