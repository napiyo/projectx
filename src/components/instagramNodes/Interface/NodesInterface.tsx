// Define data structures
export interface Button {
    id: number;
    type: "web_url" | "postback";
    title: string;
    url?: string;
    payload?: string;
  }
  
  export interface GenericTemplateData {
    title: string;
    image_url?: string;
    subtitle?: string;
    default_action?: { type: string; url: string };
    buttons: Button[];
  }


  export interface msgNodeMsgType {
    msgType: "text" | "audio" | "video" | "sticker" | "image" | "post";
  }
  
  // Use the new interface inside messageNodeData
  export interface MessageNodeData extends msgNodeMsgType {
    url?: string;
    msg?: string;
  }

  export interface checkMsgTypes {
    msgType: "contains" | "exact" | "isEmail" | "isNumber"  | "isPhoneNumber" | "isLink"; 
  }
  
  export interface checkuserTypes {
    userChecks: "isVerified" | "hasFollowers" | "followsYou"; 
  }
  export interface checkMsgData {
    keywords:string[],
    exactMatch:string,
    checkConditions:checkMsgTypes['msgType'][]
  }

  export function getButtonCntLimit(type:string){
    switch (type) {
      case "genericTemplate":
      case "buttonTemplate":
        return 3;
      case "quickReply":
        return 13;
      default:
        return 10;
    }
  }