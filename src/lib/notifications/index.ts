import firebase from "./firebase";
 

function sendNotificationToUser( userId: string,title : string , message: string) {
  const payload = {
    data: {
      title: title,
      body: message,
    },
    token : userId ,  
  };
 


  return firebase.messaging().send({
    data: {
      title: title,
      body: message, 
    },
    token: userId,
  },
  { 
    contentAvailable: true, 
    priority: 'high',
  });
}
export { sendNotificationToUser };