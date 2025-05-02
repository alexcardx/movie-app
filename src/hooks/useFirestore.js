import { db } from "../services/firebase";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useFirestore = () => {
  const toast = useToast();

  const saveWatchItemToDB = async (userId, contentId, data) => {
    try {
      await setDoc(doc(db, "users", userId, "watchlist", contentId), data);
      toast({
        title: "Added to watchlist!",
        status: "success",
        isClosable: true,
      });
    } catch {
      toast({
        title: "Failed to add to watchlist!",
        status: "error",
        isClosable: true,
      });
    }
  };

  const removeItemFromDB = async (userId, contentId) => {
    try {
      await deleteDoc(doc(db, "users", userId, "watchlist", contentId));
      toast({
        title: "Deleted from watchlist!",
        status: "success",
        isClosable: true,
      });
    } catch {
      toast({
        title: "Failed to delete to watchlist!",
        status: "error",
        isClosable: true,
      });
    }
  };

  const getWatchlist = useCallback(async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "watchlist")
    );
    const data = querySnapshot.docs.map((doc) => {
      return { ...doc.data() };
    });

    return data;
  }, []);

  const checkIfInWatchlist = useCallback(async (userId, contentId) => {
    const docRef = doc(db, "users", userId, "watchlist", contentId);

    const docSnap = await getDoc(docRef);

    return docSnap.exists();
  }, []);

  const saveActorToDB = async (userId, actorId, data) => {
    try {
      await setDoc(doc(db, "users", userId, "favourites", actorId), data);
      toast({
        title: "Added to favourites!",
        status: "success",
        isClosable: true,
      });
    } catch {
      toast({
        title: "Failed to add to favourites!",
        status: "error",
        isClosable: true,
      });
    }
  };

  const removeActorFromDB = async (userId, actorId) => {
    try {
      await deleteDoc(doc(db, "users", userId, "favourites", actorId));
      toast({
        title: "Deleted from favourites!",
        status: "success",
        isClosable: true,
      });
    } catch {
      toast({
        title: "Failed to delete to favourites!",
        status: "error",
        isClosable: true,
      });
    }
  };

  const checkIfInFavourites = useCallback(async (userId, actorId) => {
    const docRef = doc(db, "users", userId, "favourites", actorId);

    const docSnap = await getDoc(docRef);

    return docSnap.exists();
  }, []);

  const getActors = useCallback(async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "favourites")
    );
    const data = querySnapshot.docs.map((doc) => {
      return { ...doc.data() };
    });

    return data;
  }, []);

  return {
    saveWatchItemToDB,
    removeItemFromDB,
    getWatchlist,
    checkIfInWatchlist,
    saveActorToDB,
    removeActorFromDB,
    checkIfInFavourites,
    getActors,
  };
};

export default useFirestore;
