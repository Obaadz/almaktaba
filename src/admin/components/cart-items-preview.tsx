import * as React from 'react';
import { Label, Box } from '@adminjs/design-system';

const CartItemsPreview = (props) => {
  const { record, resource, where } = props;
  React.useEffect(() => {
    console.log('RECORD:', record);
    console.log('RESOURCE:', resource);
    console.log('where:', where);
  });
  return <div>hello</div>;
};

export default CartItemsPreview;
