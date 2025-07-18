import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Обращаемся к Strapi API и запрашиваем изображения
        const res = await axios.get('http://localhost:1337/api/products?populate=images');
        setProducts(res.data.data.slice(0, 8)); // первые 8 товаров
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Новинки</h2>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {product.attributes.images?.data?.[0] && (
              <img
                src={`http://localhost:1337${product.attributes.images.data[0].attributes.url}`}
                alt={product.attributes.name}
                className="w-full h-80 object-cover"
              />
            )}
            <div className="mt-4">
              <h3 className="font-medium">{product.attributes.name}</h3>
              <p className="text-gray-600">${product.attributes.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;