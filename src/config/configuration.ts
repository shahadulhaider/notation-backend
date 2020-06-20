export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5480,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    dropSchema: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
  },
  jwtSecret: process.env.JWT_SECRET,
});
