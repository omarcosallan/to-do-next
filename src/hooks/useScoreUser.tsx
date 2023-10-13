import { useAuth } from "../context/AuthContext";
import { categorizeTasks } from "../utils/categorize-tasks";
import { useFetchDocuments } from "./useFetchDocuments";

export function useScoreUser() {
  const { user } = useAuth();
  const { documents } = useFetchDocuments({
    docCollection: "tasks",
    userID: user?.uid || "",
  });

  const { concludedDocuments, noConcludedDocuments, expiredDocuments } =
    categorizeTasks(documents);

  return {
    scoreCompleted: concludedDocuments?.length * 10,
    scoreNoCompleted: noConcludedDocuments?.length * -1,
    scoreExpired: expiredDocuments?.length * -5,
  };
}
