export type Review = {
  author_name: string;
  rating: number;
  text: string;
  time: Date;
};

export type Setting = {
  label: string;
  type: string;
  required: boolean;
  default: string;
};

export type MonitorPayload = {
  channel_id: string;
  return_url: string;
  settings: Setting[];
};
