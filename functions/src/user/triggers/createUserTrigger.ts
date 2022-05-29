/* eslint-disable no-unused-vars */
import * as firebase from 'firebase-functions';

const admin = require('firebase-admin');

const userCreateTrigger = firebase.firestore
  .document('users/{id}')
  .onCreate(async (snap: any, context: any) => {
    try {
      await admin
        .auth()
        .setCustomUserClaims(snap.data().uid, { role: snap.data().role });
      await admin.auth().refreshToken(snap.data().uid);
    } catch (e) {
      console.log('claims are not set');
    }

    return true;
  });

export default userCreateTrigger;
