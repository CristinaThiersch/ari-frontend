export class User {
    private id: number;
    private name: string;
    private email: string;
    private phone: string;
    private password: string;
    private address: number;
    private createdAt: Date;
    private updatedAt: Date;
    
    constructor(
      id: number,
      name: string,
      email: string,
      phone: string,
      password: string,
      address: number,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.password = password;
      this.address = address;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }

  }
  