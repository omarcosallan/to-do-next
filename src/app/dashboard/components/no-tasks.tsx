import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NoTasks() {
  return (
    <div className="w-full space-y-4">
      <span className="text-6xl">&#128546;</span>
      <h1 className="text-3xl font-bold">Que pena!</h1>
      <p>
        Você ainda não criou nenhuma tarefa.
        <br />
        Volte para a página inicial e comece sua jornada no To Do List.
      </p>
      <Button>
        <Link href="/tasks">Crie sua primeira tarefa</Link>
      </Button>
    </div>
  );
}
