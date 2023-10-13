"use client";

const Alert = lazy(() =>
  import("./components/alert").then((module) => ({
    default: module.Alert,
  }))
);
const Overview = lazy(() =>
  import("./components/overview").then((module) => ({
    default: module.Overview,
  }))
);
const CurrentMonth = lazy(() =>
  import("./components/current-month").then((module) => ({
    default: module.CurrentMonth,
  }))
);
const RecentTaks = lazy(() =>
  import("./components/recent-tasks").then((module) => ({
    default: module.RecentTaks,
  }))
);
const Months = lazy(() =>
  import("./components/months").then((module) => ({
    default: module.Months,
  }))
);
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useFilterType } from "@/context/FilterType";
import { useFetchDocuments } from "@/hooks/useFetchDocuments";
import { FilterType } from "@/types/filters";
import { alertTexts } from "@/utils/alert-text";
import { categorizeTasks } from "@/utils/categorize-tasks";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  FileTextIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons/dist";
import { User } from "firebase/auth";
import { Suspense, lazy } from "react";
import { NoTasks } from "./components/no-tasks";

export default function Dashboard() {
  const { user } = useAuth();
  const { documents, isFetching } = useFetchDocuments({
    docCollection: "tasks",
  });
  const { setType } = useFilterType();
  setType(FilterType.ALL);

  const { concludedDocuments, noConcludedDocuments, expiredDocuments } =
    categorizeTasks(documents);

  const { description, icon } = alertTexts(user as User, documents);

  return (
    <div className="w-full space-y-5 py-8 text-left">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl">Carregando...</p>
          </div>
        }
      >
        {!isFetching && (
          <>
            {documents.length > 0 ? (
              <>
                <h2 className="text-start text-3xl">Dashboard</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Card className="sm:w-4/6 text-left flex items-center justify-between p-6">
                    <div className="flex flex-col">
                      <CardTitle className="mb-4">
                        Olá, {user?.displayName}!
                      </CardTitle>
                      <CardDescription className="sm:w-3/4">
                        Este é o seu painel de controle, onde você pode
                        acompanhar informações importantes em tempo real.
                      </CardDescription>
                    </div>
                  </Card>

                  <Alert icon={icon} description={description} />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        All tasks
                      </CardTitle>
                      <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {documents.length}
                      </div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Completed
                      </CardTitle>
                      <CheckCircledIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {concludedDocuments.length}
                      </div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Not completed
                      </CardTitle>
                      <CrossCircledIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {noConcludedDocuments.length}
                      </div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Expired
                      </CardTitle>
                      <StopwatchIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {expiredDocuments.length}
                      </div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4 flex flex-col justify-between">
                    <CardHeader>
                      <CardTitle>Visão geral</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Overview documents={documents} />
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Tarefas recentes</CardTitle>
                      <CardDescription>
                        Encontre aqui as tarefas mais recentes realizadas ou em
                        andamento.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentTaks />
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-3 flex flex-col justify-between">
                    <CardHeader>
                      <CardTitle>Mês atual</CardTitle>
                      <CardDescription>
                        Encontre aqui as tarefas mais recentes realizadas ou em
                        andamento.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CurrentMonth documents={documents} />
                    </CardContent>
                  </Card>

                  <Card className="col-span-4 flex flex-col justify-between">
                    <CardHeader>
                      <CardTitle>Tarefas mensais</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Months documents={documents} />
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <div className="w-full py-8">
                <NoTasks />
              </div>
            )}
          </>
        )}
      </Suspense>
    </div>
  );
}
