export interface Enregistrement {
  id: number;
  nome: string;
  link: string;
}

export interface Formacao {
  id: number;
  nome: string;
  enregistrements: Enregistrement[];
}

  