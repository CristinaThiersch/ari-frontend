export class Announcement {
  id: number;
  title: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  animal: {
    id: number;
    name: string;
    statusAnimal: number;
    type: string;
    breed: string;
    size: number;
    weight: number;
    age: number;
  };
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  announcementType: {
    id: number;
    description: string;
  };
  active: boolean;
  createdAt: string;
  updatedAt: string;
  images: Array<{ id: number; image: string | null }>; // Permitir null

  constructor(data: Announcement) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.contactPhone = data.contactPhone;
    this.contactEmail = data.contactEmail;
    this.animal = data.animal;
    this.user = data.user;
    this.announcementType = data.announcementType;
    this.active = data.active;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.images = data.images || []; // Inicializa as imagens
  }
}
