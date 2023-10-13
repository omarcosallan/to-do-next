import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/firebase";

interface EditState {
  loading: boolean | null;
  error: string | null;
}

type EditAction =
  | { type: "LOADING" }
  | { type: "EDITED_DOC" }
  | { type: "ERROR"; payload: string };

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state: EditState, action: EditAction) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "EDITED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export function useEditDocument(docCollection: string) {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispath = (action: EditAction) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const editDocument = async (documentId: any, updatedData: any) => {
    checkCancelBeforeDispath({ type: "LOADING" });

    try {
      const documentRef = doc(db, docCollection, documentId);

      await updateDoc(documentRef, updatedData);
      checkCancelBeforeDispath({
        type: "EDITED_DOC",
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

  return { editDocument, response };
}
