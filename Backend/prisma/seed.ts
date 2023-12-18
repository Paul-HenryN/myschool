import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Seed roles
    const adminRole = await prisma.role.create({
        data: { name: 'admin' },
    });

    const teacherRole = await prisma.role.create({
        data: { name: 'teacher' },
    });

    const studentRole = await prisma.role.create({
        data: { name: 'student' },
    });

    console.log(
        'Roles seeded successfully:',
        adminRole,
        teacherRole,
        studentRole,
    );

    // Seed admin user
    const hashedPassword = await bcrypt.hash('AdminSecretPassword1234', 10);

    const adminUser = await prisma.user.create({
        data: {
            email: 'administrateur@myschool.net',
            name: 'administrateur',
            password: hashedPassword,
            role: { connect: { id: adminRole.id } },
        },
    });

    console.log('Admin user seeded successfully:', adminUser);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
