import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; // Import bcrypt

const prisma = new PrismaClient();

async function main() {
  // Define a function to hash passwords
  const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10; // Adjust this as needed
    return bcrypt.hash(password, saltRounds);
  };

  // Seed Roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'user',
    },
  });

  // Hash passwords
  const hashedAdminPassword = await hashPassword('admin123');
  const hashedUserPassword = await hashPassword('user123');

  // Seed Users
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@gmail.com',
      password: hashedAdminPassword,
      roleId: adminRole.id,
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      username: 'user',
      email: 'user@gmail.com',
      password: hashedUserPassword,
      roleId: userRole.id,
    },
  });

  // Seed Symptoms
  const feverSymptom = await prisma.symptom.create({
    data: {
      code: 'G001',
      name: 'Fever',
      image: '/bg.png',
      description: 'Elevated body temperature',
    },
  });

  const coughSymptom = await prisma.symptom.create({
    data: {
      code: 'G002',
      name: 'Cough',
      image: '/bg.png',
      description: 'A sudden expulsion of air from the lungs',
    },
  });

  // Seed Diseases
  const fluDisease = await prisma.disease.create({
    data: {
      name: 'Flu',
      description: 'Influenza is a viral infection that attacks your respiratory system',
      solutions: 'Rest, hydration, and over-the-counter medications',
    },
  });

  const coldDisease = await prisma.disease.create({
    data: {
      name: 'Common Cold',
      description: 'A viral infection of the upper respiratory tract',
      solutions: 'Rest, hydration, and over-the-counter cold remedies',
    },
  });

  // Seed Disease Symptoms
  await prisma.diseaseSymptom.create({
    data: {
      diseaseId: fluDisease.id,
      symptomId: feverSymptom.id,
      probability: 0.8,
    },
  });

  await prisma.diseaseSymptom.create({
    data: {
      diseaseId: fluDisease.id,
      symptomId: coughSymptom.id,
      probability: 0.7,
    },
  });

  await prisma.diseaseSymptom.create({
    data: {
      diseaseId: coldDisease.id,
      symptomId: coughSymptom.id,
      probability: 0.6,
    },
  });

  // Seed Consultations
  await prisma.consultation.create({
    data: {
      userId: regularUser.id,
      userInput: { symptoms: ['Fever', 'Cough'] },
      results: { possibleDiseases: ['Flu'], probability: 0.8 },
      diseaseId: fluDisease.id,
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
