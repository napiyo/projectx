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
  
  export interface ButtonTemplateData {
    title: string;
    buttons: Button[];
  }
  