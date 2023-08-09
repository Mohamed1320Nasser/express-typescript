import express from 'express';
import morgan from 'morgan';
import AppError from '../helpers/ApiError';
// import categoryRoutes from '../component/category/category.routes';
// import brandRoutes from '../component/brand/brand.routes';
// import productRoutes from '../component/product/product.api';
import userRoutes from './api/user.routes';
// import machinesRoutes from '../component/Machines/Machines.routes';
// import reviewRoutes from '../component/review/review.api';
// import wishlistRoutes from '../component/wishlist/wishlist.api';
// import addressRoutes from '../component/address/address.api';
// import couponRoutes from '../component/coupon/coupon.routes';
// import cartRoutes from '../component/cart/cart.api';
// import orderRoutes from '../component/order/order.routes';

export const allRequires = (app: express.Application) => {
  // Determine if development or production is enabled
  if (process.env.MODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  //   app.use('/api/v1/categories', categoryRoutes);
  //   app.use('/api/v1/brands', brandRoutes);
  //   app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/users', userRoutes);
  //   app.use('/api/v1/machines', machinesRoutes);
  //   app.use('/api/v1/reviews', reviewRoutes);
  //   app.use('/api/v1/wishlists', wishlistRoutes);
  //   app.use('/api/v1/adresses', addressRoutes);
  //   app.use('/api/v1/coupons', couponRoutes);
  //   app.use('/api/v1/carts', cartRoutes);
  //   app.use('/api/v1/orders', orderRoutes);

  // Requires
  app.all('*', (req, res, next) => {
    next(new AppError(`Cannot get this route ${req.originalUrl} here`, 404));
  });
};
