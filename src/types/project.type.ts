export type Project = {
  id: number;
  name: string;
  description: string;
  language: string;
  framework: string;
  technologies: number[];
  icon: string;
  logo: string;
  website: string;
  android?: string;
  ios?: string;
};
