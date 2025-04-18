import {RelationshipType} from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  PATIENT_COLLECTION_ID,
} from "./appwrite.config";

export const createPatientRelationship = async () => {
  try {
    await databases.getAttribute(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, "patient");

    console.log("Relationship attribute already exists.");
  } catch (error: any) {
    // If the attribute doesn't exist, create it
    if (error.code === 404) {
      const patientRelationship = await databases.createRelationshipAttribute(
        DATABASE_ID!, // Database ID
        APPOINTMENT_COLLECTION_ID!, // Collection ID
        PATIENT_COLLECTION_ID!, // Related collection ID
        RelationshipType.ManyToOne, // Relationship type
        true, // Is two-way
        "patient", // Attribute key
        "null" // On delete action
      );

      console.log("Relationship attribute created successfully!", patientRelationship); // Log the result
    } else {
      // Handle other errors when trying to get the attribute
      console.error("Error checking for existing relationship attribute:", error);
      throw error; // Re-throw the error
    }
  }
};
