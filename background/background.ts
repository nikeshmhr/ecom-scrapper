import { addDoc, collection } from 'firebase/firestore';
import db from '../firebase';

(async () => {
    try {
        console.log("Trying to write to db...")
        const docRef = await addDoc(collection(db, "test"), {
            name: 'Nikesh',
            age: 29,
            dob: 1994,
            today: Date.now()
        })

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.log("Error adding document: ", e);
    }
})();