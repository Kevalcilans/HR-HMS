import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const prisma = new PrismaClient();

const updateTotalLeaves = async () => {
    try {
        const result = await prisma.$executeRawUnsafe(`
            UPDATE User
            SET leave_balance = leave_balance + 1
            WHERE DAY(hire_date) = DAY(CURDATE()) 
              AND MONTH(hire_date) <= MONTH(CURDATE()) 
              AND (YEAR(hire_date) < YEAR(CURDATE()) OR MONTH(hire_date) < MONTH(CURDATE()));
        `);

        console.log('Total leaves updated successfully:', result);
    } catch (error) {
        console.error('Error updating leaves:', error);
    }
};


const startCronJob = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Running scheduled task to update leaves...');
        await updateTotalLeaves();
    });
};

process.on('SIGINT', async () => {
        await prisma.$disconnect();
        process.exit(0);
    });

export default startCronJob;







// this is a schedule every minitues upadate a Leve only testing perpose

// import { PrismaClient } from '@prisma/client';
// import cron from 'node-cron';

// const prisma = new PrismaClient();

// // Define the function to update the count
// const updateCount = async () => {
//     try {
//         // Raw query using Prisma for PostgreSQL
//         const result = await prisma.$queryRawUnsafe(`
//             UPDATE "User"
//             SET leave_balance = leave_balance + 1;
//         `);

//         console.log('Count updated successfully:', result);
//     } catch (error) {
//         console.error('Error updating count:', error);
//     }
// };

// // Schedule the cron job to run every 10 minutes
// const startCronJob = async () => {
//     console.log('Starting the cron job...');
    
//     // Run immediately on server start
//     await updateCount();

//     // Schedule for every 1 minutes
//     cron.schedule('* * * * *', async () => {
//         console.log('Running scheduled task to update count...');
//         await updateCount();
//     });
// };

// // Handle server shutdown to clean up Prisma connections
// process.on('SIGINT', async () => {
//     await prisma.$disconnect();
//     process.exit(0);
// });

// export default startCronJob;


