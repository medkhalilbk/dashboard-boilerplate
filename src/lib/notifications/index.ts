import firebase from "./firebase";
 

function sendNotificationToUser( userId: string,title : string , message: string) {
  const payload = {
    data: {
      title: title,
      body: message,
    },
    token : userId ,
    android:{
      priority:"high",
      ttl:10 * 60 * 1000
    }
  };

  console.log("🚀 ~ sendNotificationToUser ~ payload:", payload)


  return firebase.messaging().send(payload);
}
export { sendNotificationToUser };