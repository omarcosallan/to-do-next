import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { Task } from "@/types/task";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import error from "next/error";
import { type } from "os";
import { useEffect, useState } from "react";

interface FetchDocumentsProps {
  docCollection: string;
}

export function useFetchDocuments({ docCollection }: FetchDocumentsProps) {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Task[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    if (!user) return;

    async function loadData() {
      const collectionRef = collection(db, docCollection);

      try {
        const q = await query(
          collectionRef,
          where("createdBy", "==", user?.uid),
          orderBy("createdAt", "desc")
        );

        onSnapshot(q, (querySnapshot) => {
          const newDocuments: Task[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Task[];
          setDocuments(newDocuments);
          setIsFetching(false);
        });
      } catch (error) {
        setIsFetching(false);
        console.log(error);
      }
    }

    loadData();
  }, [docCollection, user, type]);

  return { documents, isFetching, error };
}
