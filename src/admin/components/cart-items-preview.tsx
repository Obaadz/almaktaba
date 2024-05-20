import * as React from 'react';
import { Label, Box } from '@adminjs/design-system';

const CartItemsPreview = (props) => {
  React.useEffect(() => {
    console.log('PROPS', props);
  });

  return (
    <>
      <Label>
        Items{'('}Books{')'}
      </Label>
    </>
  );
};

export default CartItemsPreview;
