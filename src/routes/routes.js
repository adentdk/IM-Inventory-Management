import {lazy} from 'react'

import {Lazyload} from './../HOC'

import {
  Clean as CleanLayout,
  Dashboard as DashboardLayout,
  Basic as BasicLayout
} from './../layouts'
import GenericNotFound from '../features/Error/pages/GenericNotFound'

const Login = lazy(() => import('./../features/Login'))

const DashboardHome = lazy(() => import('./../features/Dashboard/pages/Home'))

const ProductCategoryList = lazy(() => import('./../features/ProductCategory/pages/ProductCategoryList'))
const ProductCategoryAdd = lazy(() => import('./../features/ProductCategory/pages/AddProductCategory'))
const ProductCategoryEdit = lazy(() => import('./../features/ProductCategory/pages/EditProductCategory'))

const ProductList = lazy(() => import('./../features/Product/pages/ProductList'))
const ProductAdd = lazy(() => import('./../features/Product/pages/AddProduct'))
const ProductEdit = lazy(() => import('./../features/Product/pages/EditProduct'))

export const routes = [
  {
    path: '',
    exact: false,
    title: 'Root',
    component: CleanLayout,
    child: [
      {
        path: '/auth',
        title: 'LoginLayout',
        exact: false,
        component: BasicLayout,
        child: [
          {
            path: '/auth/login',
            title: 'Login',
            exact: true,
            component: Lazyload(Login)
          },
        ]
      },
      {
        path: '/home',
        title: 'DashboardLayout',
        exact: false,
        component: DashboardLayout,
        child: [
          {
            path: '/home/dashboard',
            title: 'Dashboard',
            exact: false,
            component: BasicLayout,
            child: [
              {
                path: '/home/dashboard',
                title: 'Dashboard',
                exact: true,
                component: Lazyload(DashboardHome)
              }
            ]
          },
          {
            path: '/home/product',
            title: 'ProductLayout',
            exact: false,
            component: BasicLayout,
            child: [
              {
                path: '/home/product',
                title: 'Product',
                exact: true,
                component: Lazyload(ProductList)
              },
              {
                path: '/home/product/add',
                title: 'Add Product',
                exact: true,
                component: Lazyload(ProductAdd)
              },
              {
                path: '/home/product/:id/edit',
                title: 'Edit Product',
                exact: true,
                component: Lazyload(ProductEdit)
              }
            ]
          },
          {
            path: '/home/product-category',
            title: 'Product Category',
            exact: false,
            component: BasicLayout,
            child: [
              {
                path: '/home/product-category',
                title: 'Product Category',
                exact: true,
                component: Lazyload(ProductCategoryList)
              },
              {
                path: '/home/product-category/add',
                title: 'Add Category',
                exact: true,
                component: Lazyload(ProductCategoryAdd)
              },
              {
                path: '/home/product-category/:id/edit',
                title: 'Edit Category',
                exact: true,
                component: Lazyload(ProductCategoryEdit)
              }
            ]
          }
        ]
      }
    ]
  }
]