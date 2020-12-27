export const PRODUCT = 'PRODUCT';
export const PRICE = 'PRICE';
export const DETAILS = 'DETAILS';
export const QUANTITY = 'QUANTITY';
export const CONFIRMATION = 'CONFIRMATION';
export const CART = 'CART';
export const REMOVE = 'REMOVE';
export const ID = 'ID';

export const productItem = (product) => ({
  type: PRODUCT,
  product,
});

export const productID = (id) => ({
  type: ID,
  id,
})

export const productPrice = (price) => ({
  type: PRICE,
  price,
});

export const productDetails = (toogle, product) => ({
  type: DETAILS,
  toogle,
  product,
});

export const productQuantity = (id, quantity) => ({
  type: QUANTITY,
  id,
  quantity,
})

export const renderConfirmation = (toogle) => ({
  type: CONFIRMATION,
  toogle,
})

export const cartListHandler = (cartItem) => ({
  type: CART,
  cartItem,
})

export const removeCart = (cartItem) => ({
  type: REMOVE,
  cartItem,
})