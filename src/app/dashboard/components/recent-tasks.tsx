import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";

export function RecentTaks() {
  const { user } = useAuth();
  const { documents, isFetching } = useFetchDocuments({
    docCollection: "tasks",
  });

  const recentsTask = documents.slice(0, 5);

  return (
    <div className="space-y-8">
      {recentsTask &&
        recentsTask.map((task) => (
          <div key={task.id} className="flex items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user?.photoURL ? user?.photoURL : ""}
                alt={`Photo ${user?.displayName}`}
              />
              <AvatarFallback>
                {user?.displayName ? user?.displayName[0] : ""}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{task.title}</p>
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            </div>
            <div className="ml-auto text-sm text-muted-foreground">
              {task.concluded ? "Concluida" : "Pendente"}
            </div>
          </div>
        ))}
    </div>
  );
}
