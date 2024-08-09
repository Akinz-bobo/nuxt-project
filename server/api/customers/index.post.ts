import { customers } from "~/server/data/customers";
import { faker } from "@faker-js/faker";
export default defineEventHandler(async (event) => {
  const body: {
    fullname: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
  } = await readBody(event);

  const newCustomer = {
    id: faker.string.uuid(),
    name: body.fullname,
    email: body.email,
    gender: body.gender,
    avatar: faker.internet.avatar(),
    age: body.age,
    phone: body.phone,
  };
  return [newCustomer, ...customers];
});
