import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";

const prisma = new PrismaClient()
const adminUser = process.env["ADMIN_USER"] || "admin";
const adminPassword = process.env["ADMIN_PASSWORD"] || "password";
const adminEmail = process.env["ADMIN_EMAIL"] || "example@email.com";

async function createAdminUser() {
  const exists = await prisma.user.count({ where: { name: adminUser } }) > 0;

  if (!exists) {
    const pwHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        name: adminUser,
        email: adminEmail,
        pwHash: pwHash,
        activationCode: null
      }
    });
  }
}

async function main() {
  const landingPage = await prisma.page.create({
    data: {
      name: "landing",
      content: "This is the landing page"
    }
  });

  await createAdminUser();
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
