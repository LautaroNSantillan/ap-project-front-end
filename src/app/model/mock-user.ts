export class MockUser {
    id?:number;
    name: string;
    lastName: string;
    birthdate: Date;

    constructor(name: string, lastName: string, birthdate: Date) {
        this.name = name;
        this.lastName = lastName;
        this.birthdate = birthdate;
    }
}
