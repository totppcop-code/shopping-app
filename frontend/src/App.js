import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 統一 API URL
const API_URL ="/api/products/";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });

  // 取得商品列表 (後端 API)
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // 新增商品
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, form);
      setProducts([...products, res.data]);
      setForm({ name: '', description: '', price: '', stock: '' });
    } catch (err) {
      console.error(err);
      alert('新增失敗');
    }
  };

  // 加入購物車
  const addToCart = async (product) => {
    if (product.stock > 0) {
      try {
        await axios.patch(`${API_URL}${product.id}/`, {
          stock: product.stock - 1
        });
        setProducts(products.map(p =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        ));

        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
          setCartItems(cartItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ));
        } else {
          setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
      } catch (err) {
        console.error(err);
        alert('加入購物車失敗');
      }
    } else {
      alert('庫存不足！');
    }
  };

  // 取消購物車商品
  const removeFromCart = async (item) => {
    try {
      await axios.patch(`${API_URL}${item.id}/`, {
        stock: item.stock + item.quantity
      });
      setCartItems(cartItems.filter(c => c.id !== item.id));
      setProducts(products.map(p =>
        p.id === item.id ? { ...p, stock: p.stock + item.quantity } : p
      ));
    } catch (err) {
      console.error(err);
      alert('取消失敗');
    }
  };

  return (
    <div>
      <h1>🛒 小型購物車</h1>

      {/* 新增商品表單 */}
      <form onSubmit={addProduct}>
        <input type="text" placeholder="商品名稱" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <textarea placeholder="商品描述" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input type="number" placeholder="價格" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input type="number" placeholder="庫存" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        <button type="submit">新增商品</button>
      </form>

      {/* 商品列表 */}
      <h2>商品列表</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price} | 庫存: {p.stock}
            <button onClick={() => addToCart(p)}>加入購物車</button>
          </li>
        ))}
      </ul>

      {/* 購物車 */}
      <h2>購物車</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} x {item.quantity}
            <button onClick={() => removeFromCart(item)}>取消</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
