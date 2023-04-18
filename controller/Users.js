"use strict"; // Using strict.

// All Imports.
import { decode, encode } from "../middleware/auth.js";
import { connect } from "../src/DB.js";
import UserSchema from "../models/Users.js";

/**
 * Current collection getted.
 */
export const table = connect().collection("Users");

/**
 * Data getted to return.
 */
let dataRet;

/**
 * Getting last users id.
 * @returns last id or 0 if don't get data.
 */
export async function getLastUserID() {
  dataRet = await decode(await getUsers());
  if (dataRet.length == 0) return encode(0);
  return encode(dataRet[dataRet.length - 1]["id"]);
}

/**
 * To get data of multiple users.
 * @param { UserSchema | undefined } data
 * @returns encoded users.
 */
export async function getUsers(data) {
  if (data == undefined) data = {};
  dataRet = await table.find(data).toArray();
  return encode(dataRet);
}

/**
 * To add data in users.
 * @param { UserSchema } data
 * @returns message.
 */
export async function addUser(data) {
  let msg,
    jsonToAdd = {};
  if (data == undefined || Object.keys(data).length == 0)
    throw new RangeError("The data is empty or undefined.");
  else {
    if (data.id == undefined)
      jsonToAdd["id"] = decode(await getLastUserID()) + 1;
    Object.keys(UserSchema).forEach((keyOfSchema) => {
      Object.keys(data).forEach(async (key) => {
        if (keyOfSchema == "id") return;
        if (key == keyOfSchema) jsonToAdd[key] = data[key];
        else jsonToAdd[keyOfSchema] = null;
      });
    });
  }
  await table
    .insertOne(jsonToAdd)
    .then(() => {
      msg = "Success";
    })
    .catch((err) => (msg = err));
  return msg;
}

/**
 * To update data in users.
 * @param { number } inId
 * @param { UserSchema } data
 * @returns message.
 */
export async function updateUser(inId, data) {
  let msg;
  if (data == undefined || Object.keys(data).length == 0)
    throw new RangeError("The data is empty or undefined.");
  await table
    .updateOne({ id: inId }, { $set: data })
    .then(() => {
      msg = "Success";
    })
    .catch((err) => (msg = err));
  return msg;
}

/**
 * To delete data in users.
 * @param { number } idToDelete
 * @returns message.
 */
export async function deleteUser(idToDelete) {
  let msg;
  await table
    .deleteOne({ id: idToDelete })
    .then(() => {
      msg = "Success";
    })
    .catch((err) => (msg = err));
  return msg;
}