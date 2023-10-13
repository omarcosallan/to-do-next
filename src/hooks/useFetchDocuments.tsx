import { useAuth } from "@/context/AuthContext";
import { useFilterType } from "@/context/FilterType";
import { db } from "@/firebase/firebase";
import { FilterType } from "@/types/filters";
import { Task } from "@/types/task";
import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import error from "next/error";
import { useEffect, useState } from "react";

interface FetchDocumentsProps {
  docCollection: string;
}

export function useFetchDocuments({ docCollection }: FetchDocumentsProps) {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Task[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const { type } = useFilterType();

  useEffect(() => {
    if (!user) return;

    async function loadData() {
      const collectionRef = collection(db, docCollection);

      try {
        let q;

        if (type === FilterType.PENDING) {
          q = await query(
            collectionRef,
            where("createdBy", "==", user?.uid),
            where("concluded", "==", false),
            where("finishIn", ">=", Timestamp.now()),
            orderBy("finishIn", "desc")
          );
        } else if (type === FilterType.CONCLUDED) {
          q = await query(
            collectionRef,
            where("createdBy", "==", user?.uid),
            where("concluded", "==", true),
            orderBy("createdAt", "desc")
          );
        } else if (type === FilterType.EXPIRED) {
          q = await query(
            collectionRef,
            where("createdBy", "==", user?.uid),
            where("concluded", "==", false),
            where("finishIn", "<", Timestamp.now()),
            orderBy("finishIn", "desc")
          );
        } else if (type === FilterType.TODAY) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const endOfDay = new Date(today);
          endOfDay.setHours(23, 59, 59, 999);

          const startTimestamp = Timestamp.fromDate(today);
          const endTimestamp = Timestamp.fromDate(endOfDay);

          q = await query(
            collectionRef,
            where("createdBy", "==", user?.uid),
            where("finishIn", ">=", startTimestamp),
            where("finishIn", "<=", endTimestamp),
            orderBy("finishIn", "desc")
          );
        } else {
          q = await query(
            collectionRef,
            where("createdBy", "==", user?.uid),
            orderBy("createdAt", "desc")
          );
        }
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
