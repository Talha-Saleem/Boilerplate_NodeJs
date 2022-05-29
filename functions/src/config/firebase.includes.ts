import * as functions from 'firebase-functions';
const admin = require('firebase-admin');

const serviceAccount = {
  type: functions.config().serviceaccount.type,
  project_id: functions.config().serviceaccount.project_id,
  private_key_id: functions.config().serviceaccount.private_key_id,
  private_key: functions.config().serviceaccount.private_key.replace(/\\n/g, '\n'),
  client_email: functions.config().serviceaccount.client_email,
  client_id: functions.config().serviceaccount.client_id,
  auth_uri: functions.config().serviceaccount.auth_uri,
  token_uri: functions.config().serviceaccount.token_uri,
  auth_provider_x509_cert_url: functions.config().serviceaccount.auth_provider_x509_cert,
  client_x509_cert_url: functions.config().serviceaccount.client_x509_cert_url,
};

if (process.env.FUNCTIONS_EMULATOR) {
  // Logger.logMessage('Running locally');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.initializeApp();
}

const database = admin.firestore();

export { admin, database };
