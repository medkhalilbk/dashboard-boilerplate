
import * as admin from 'firebase-admin'; 
import { getApps } from 'firebase-admin/app';
let alreadyCreatedApps = getApps()
let serviceAccount = require("./serviceAccountKey.json")
let firebase  = alreadyCreatedApps.length == 0 ? admin.initializeApp({
    credential:admin.credential.cert(serviceAccount as any)}) : alreadyCreatedApps[0]  as any; 
 
export default firebase