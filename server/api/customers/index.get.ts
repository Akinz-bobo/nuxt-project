import { faker } from "@faker-js/faker";
import { Data } from "~/types";
import { customers } from "~/server/data/customers";

export default defineEventHandler(async (event): Promise<Data> => {
  const q = getQuery(event);

  const count = Number(q.count || 10);
  for (let i = 0; i < count; i++) {
    customers.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      gender: faker.person.gender(),
      avatar: faker.internet.avatar(),
      age: faker.number.int({ min: 18, max: 80 }),
      phone: faker.phone.number(),
    });
  }

  return {
    status: 200,
    body: customers,
  };
});
