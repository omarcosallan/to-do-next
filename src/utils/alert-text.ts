import { Task } from "@/types/task";
import { User } from "firebase/auth";
import { categorizeTasks } from "./categorize-tasks";

export function alertTexts(user: User, documents: Task[]) {
  let icon = "";
  let description = "";

  const { concludedDocuments, concludedTodayDocuments, noConcludedDocuments } =
    categorizeTasks(documents);

  if (
    concludedDocuments?.length > 0 &&
    concludedDocuments?.length === documents?.length
  ) {
    icon = `⚡`;
    description = `Parabéns, ${user?.displayName}! Você concluiu todas as suas tarefas.`;
  } else if (concludedTodayDocuments?.length > 0) {
    icon = "⏱";
    description = `${
      concludedTodayDocuments?.length === 1 ? " Uma" : " Algumas"
    } de suas tarefas de hoje ${
      concludedTodayDocuments?.length === 1 ? " está " : " estão "
    } prestes a expirar.`;
  } else if (noConcludedDocuments?.length > 0) {
    icon = "⏳";
    description = `Você tem ${
      noConcludedDocuments?.length === 1
        ? " uma tarefa pendente"
        : " algumas tarefas pendentes"
    }, mantenha o cuidado para não acumulá-las.`;
  }

  return { description, icon };
}
