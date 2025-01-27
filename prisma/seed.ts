import { prisma } from '../lib/prisma';

async function main() {
  // Seed roles
  const roles = await prisma.role.createMany({
    data: [
      { id: 1, name: 'admin' },
      { id: 2, name: 'user' },
    ],
    skipDuplicates: true, // Avoids duplicate errors if run multiple times
  });

  console.log('Roles seeded:', roles);

  // Seed users
  const users = await prisma.user.createMany({
    data: [
      {
        id: 1,
        username: 'admin_user',
        email: 'admin@example.com',
        password: 'hashed_password_admin', // Replace with a hashed password
        roleId: 1,
      },
      {
        id: 2,
        username: 'regular_user',
        email: 'user@example.com',
        password: 'hashed_password_user', // Replace with a hashed password
        roleId: 2,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Users seeded:', users);

  // Seed diseases
  const diseases = await prisma.disease.createMany({
    data: [
      {
        id: 1,
        name: 'Rice Blast',
        description: 'A fungal disease causing leaf spots and yield loss.',
        solutions: 'Apply fungicides and use resistant varieties',
      },
      {
        id: 2,
        name: 'Bacterial Leaf Blight',
        description: 'A bacterial disease that causes leaf wilting and yellowing.',
        solutions: 'Use disease-free seeds and apply appropriate antibiotics',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Diseases seeded:', diseases);

  // Seed symptoms
  const symptoms = await prisma.symptom.createMany({
    data: [
      {
        id: 1,
        name: 'Leaf Spots',
        description: 'Small, dark brown spots on leaves.',
      },
      {
        id: 2,
        name: 'Leaf Yellowing',
        description: 'Yellowing and wilting of leaves.',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Symptoms seeded:', symptoms);

  // Seed disease symptoms
  const diseaseSymptoms = await prisma.diseaseSymptom.createMany({
    data: [
      { id: 1, diseaseId: 1, symptomId: 1, probability: 0.8 },
      { id: 2, diseaseId: 2, symptomId: 2, probability: 0.9 },
    ],
    skipDuplicates: true,
  });

  console.log('Disease Symptoms seeded:', diseaseSymptoms);
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
