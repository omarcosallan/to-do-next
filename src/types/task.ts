import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Timestamp;
  finishIn: Timestamp;
  concludedAt: Timestamp;
  concluded: boolean;
}
