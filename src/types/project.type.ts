export type Project = {
  id: number;
  name: string;
  language: string;
  framework: string;
  platform: 'android' | 'ios' | 'web';
  description: string;
  images: any[];
};
