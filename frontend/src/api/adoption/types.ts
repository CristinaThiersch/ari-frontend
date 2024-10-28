export interface CreateAdoptionAnnouncementPayload {
    title: string;
    description: string;
    animal: {
      name: string;
      statusAnimal: number;
      type: string;
      breed: string;
      size: number;
      weight: number;
      age: number;
    },
    announcementType: {
      id: number;
    },
    contactPhone: string;
    user: {
      id: number;
    },
    imageAnnouncement?: string;
  }
  