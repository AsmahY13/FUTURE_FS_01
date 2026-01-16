export interface ProjectType {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  gradient: string;
  createdAt: any;
}

export interface SkillType {
  category: string;
  items: string[];
  icon: string;
}

export interface FormDataType {
  name: string;
  email: string;
  message: string;
}

export interface MousePositionType {
  x: number;
  y: number;
}