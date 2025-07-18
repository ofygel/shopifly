import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import productsRoute from './routes/products.js'; // Обрати внимание на .js

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Разрешаем CORS
app.use(cors());

// Поддержка JSON-запросов
app.use(express.json());

// Подключаем роут для продуктов
app.use('/api/products', productsRoute);

// Раздача фронтенда (dist Vite)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Для поддержки клиентских маршрутов React (например, /product/123)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});