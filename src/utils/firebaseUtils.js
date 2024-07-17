// Import the functions you need from the SDKs you need
import {
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	updateDoc,
	doc,
} from "firebase/firestore/lite";
/**
 *Utility Function that gets all documents from a Firestore Database
 * @param {database} db An instance of a Cloud Firestore Database
 * @param {string} collectionName The name of a Firestore db collection
 * @returns {array} An array of objects from the collection
 */
async function getAllDocs(db, collectionName) {
	try {const snapshot = await getDocs(collection(db, collectionName));
	const collectionList = snapshot.docs.map((doc) => ({
		id: doc.id,
		data: doc.data(),
	}));
	return collectionList;} catch(error) {
		console.log(error);
	}
}
/**
 * Utility Function that adds a document to a Google Cloud Firestore Database
 * @param {database} db An instance of a Cloud Firestore Database
 * @param {string} collectionName The name of a Firestore db collection
 * @param {object} collectionObject  An object representing a collection document
 * @returns {string} Return the id of the object that was added
 */
async function addADoc(db, collectionName, collectionObject) {
	try {
		const docRef = await addDoc(
			collection(db, collectionName),
			collectionObject
		);
		console.log(`${collectionObject} was added to the collection`, docRef.id);
		return docRef.id;
	} catch (e) {
		console.log("Failed to add ", e);
	}
}
/**
 * Utility Function that deletes a document from a Google Cloud Firestore Database
 * @param {database} db An instance of a Cloud Firestore Database
 * @param {string} collectionName The name of a Firestore db collection
 * @param {string} objectId The Id of the document you are deleting
 */
async function removeADoc(db, collectionName, objectId) {
	try {
		deleteDoc(doc(db, collectionName, objectId));
		console.log("Successfully removed document");
	} catch (e) {
		console.log(objectId);
		console.log("Failed to delete", e);
	}
}
/**
 * Utility Function that updates a document in a Google Cloud Firestore Database
 * @param {database} db An instance of a Cloud Firestore Database
 * @param {string} collectionName The name of a Firestore db collection
 * @param {object} collectionObject An object representing a collection document
 * @param {string} objectId The Id of the document you are deleting
 
*/
async function updateADoc(
	db,
	collectionName,
	collectionObject,
	objectId
) {
	try {
		const docRef = doc(db, collectionName, objectId);
		if(docRef){
		updateDoc(docRef, collectionObject);
		console.log(`${collectionObject}, ${objectId}`);
		} else{
			console.log("No document found");
		}
	} catch (e) {
		console.log("Failed to update doc ", e);
	}
}
export {
	getAllDocs,
	addADoc,
	removeADoc,
	updateADoc,
};