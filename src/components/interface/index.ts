export interface MVItem {
  id: string;
  name: string;
  ar: { name: string }[];
  al: {
    name: string;
    picUrl: string;
  };
  dt: number;
  mv: number;
}
