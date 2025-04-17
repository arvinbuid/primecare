"use server";

import {ID} from "node-appwrite";
import {APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases} from "../appwrite.config";
import {parseStringify} from "../utils";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    // Create new appointment document
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.error(error);
  }
};
