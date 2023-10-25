import { User } from "./User";

export class Recipe {
  id: string;
  title: string;
  createdAt: Date;
  createdById: string;
  createdBy: User;
}
