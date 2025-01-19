import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.config";
import { getAuth } from "firebase/auth";
// pobiera dane po prostu, zeby nie trzeba bylo wszedzie pisac to samo
export const fetchUserData = async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    try {
        // @ts-ignore
        const userDocRef = doc(db, "Users", userId); // nwm czemu sie pluje bo dziala lol
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
