import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.config";
import { getAuth } from "firebase/auth";

export const fetchUserData = async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    
    try {
        const userDocRef = doc(db, "Users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            return userData;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};
