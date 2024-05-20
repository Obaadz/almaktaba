import * as React from 'react';
import { Label, Box } from '@adminjs/design-system';

function transformParams(params: any) {
  const result = {};

  for (const key in params) {
    const value = params[key];
    const keys = key.split('.'); // Split the key into parts

    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      const part = keys[i];

      if (!current[part]) current[part] = isNaN(parseInt(keys[i + 1])) ? {} : [];

      current = current[part];
    }

    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;
  }

  return result as Params;
}

const CartItemsPreview = (props) => {
  const params: Params = transformParams(props.record.params);

  console.log(params);

  return (
    <div
      style={{
        fontFamily: 'Roboto, sans-serif',
        fontSize: '12px',
        lineHeight: '16px',
        color: 'rgb(137, 138, 154)',
        marginBottom: '4px',
        fontWeight: '300',
      }}
    >
      <Label>
        Items{'('}Books{')'}
      </Label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {params.cartItems.map((item) => (
          <Box
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              marginBottom: '0.5rem',
            }}
          >
            <img
              src={item.book.url}
              alt={item.book.title}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '0.25rem',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h4>{item.book.title}</h4>
              <p>Price: {item.bookPrice}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default CartItemsPreview;

export interface Params {
  id: number;
  cartItems: CartItem[];
}

export interface CartItem {
  id: number;
  bookPrice: string;
  quantity: number;
  book: Book;
}

export interface Book {
  id: number;
  title: string;
  status: number;
  category: number;
  url: string;
}
