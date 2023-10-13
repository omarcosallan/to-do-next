import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/firebase";

interface DeleteState {
  loading: boolean | null;
  error: string | null;
}

type DeleteAction =
  | { type: "LOADING" }
  | { type: "DELETED_DOC" }
  | { type: "ERROR"; payload: string };

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state: DeleteState, action: DeleteAction) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export function useDeleteDocument(docCollection: string) {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispath = (action: DeleteAction) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (documentId: string) => {
    checkCancelBeforeDispath({ type: "LOADING" });

    try {
      const documentRef = doc(db, docCollection, documentId);
      await deleteDoc(documentRef);

      checkCancelBeforeDispath({
        type: "DELETED_DOC",
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

  return { deleteDocument, response };
}
