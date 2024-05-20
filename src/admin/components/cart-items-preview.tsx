import * as React from 'react';
import { Label, Box } from '@adminjs/design-system';
import { OrderService } from '../../services/order.service.js';

type Props = {
  params: {
    id: number;
  };
};

const CartItemsPreview = async (props: Props) => {
  const order = await OrderService.getOrderById(props.params.id);

  console.log(order);

  return (
    <>
      <Label>
        Items{'('}Books{')'}
      </Label>
    </>
  );
};

export default CartItemsPreview;
