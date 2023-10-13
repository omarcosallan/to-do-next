import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/firebase";

interface InsertDocumentProps {
  docCollection: string;
}

interface InsertDocumentProps {
  docCollection: string;
}

interface InsertState {
  loading: boolean | null;
  error: string | null;
}

type InsertAction =
  | { type: "LOADING" }
  | { type: "INSERTED_DOC" }
  | { type: "ERROR"; payload: string };

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state: InsertState, action: InsertAction) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export function useInsertDocument({ docCollection }: InsertDocumentProps) {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispath = (action: InsertAction) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document: any) => {
    checkCancelBeforeDispath({ type: "LOADING" });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      const collectionRef = collection(db, docCollection);
      await addDoc(collectionRef, newDocument);

      checkCancelBeforeDispath({
        type: "INSERTED_DOC",
      });
    } catch (error) {
      if (typeof error === "string") {
        checkCancelBeforeDispath({
          type: "ERROR",
          payload: error || "An error occurred",
        });
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
}
