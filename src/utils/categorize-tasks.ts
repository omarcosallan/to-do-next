import { Task } from "@/types/task";

export function categorizeTasks(documents: Task[]) {
  const concludedDocuments = documents?.filter((doc: Task) => doc.concluded);
  const concludedTodayDocuments = documents?.filter(
    (doc: Task) =>
      new Date().getDate() === doc.finishIn.toDate().getDate() && !doc.concluded
  );
  const noConcludedDocuments = documents?.filter((doc: Task) => !doc.concluded);
  const expiredDocuments = documents?.filter(
    (doc: Task) =>
      !doc.concluded && doc.finishIn.toDate().getTime() < new Date().getTime()
  );

  return {
    concludedDocuments,
    concludedTodayDocuments,
    noConcludedDocuments,
    expiredDocuments,
  };
}
