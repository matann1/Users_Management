export class User {
  constructor(
    public ID?: Number,
    public Name?: String,
    public Email?: String,
    public Street?: String,
    public City?: String,
    public Zipcode?: Number,
    public Tasks?: [{ ID: Number; Title: String; Completed: Boolean }],
    public Posts?: [{ ID: Number; Title: String; Body: String }]
  ) {}
}
