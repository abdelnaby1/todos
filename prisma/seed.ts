import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.createMany({
    data: Array.from({ length: 25 }, () => ({
      title: faker.lorem.words({ min: 3, max: 5 }),
      body: faker.lorem.words({ min: 1, max: 10 }),
    })),
    // await prisma.user.createMany({
    //   data: Array.from({ length: 25 }, () => ({
    //     name: faker.internet.userName(),
    //     email: faker.internet.email(),
    //     address: {
    //       street: faker.location.street(),
    //       city: faker.location.city(),
    //       state: faker.location.state(),
    //       zip: faker.location.zipCode(),
    //     },
    //   })),
  });

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     todos: true,
  //   },
  // });
  // console.dir(allUsers, { depth: null });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
