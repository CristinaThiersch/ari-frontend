export class Animal {
    private id: number;
    private name: string;
    private type: string;
    private breed: string;
    private size: string;
    private weight: string;
    private age: string;
    private userId: number;
    private createdAt: Date;
    private updatedAt: Date;
  
    constructor(
      id: number,
      name: string,
      type: string,
      breed: string,
      size: string,
      weight: string,
      age: string,
      userId: number,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.breed = breed;
      this.size = size;
      this.weight = weight;
      this.age = age;
      this.userId = userId;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  