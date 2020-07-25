import {lazy} from 'react'

import {Lazyload} from './../HOC'

import {
  Clean as CleanLayout,
  Dashboard as DashboardLayout,
  Basic as BasicLayout
} from './../layouts'

const Login = lazy(() => import('./../features/Login'))

const DashboardHome = lazy(() => import('./../features/Dashboard/pages/Home'))

const ProductCategoryList = lazy(() => import('./../features/ProductCategory/pages/ProductCategoryList'))
const ProductCategoryAdd = lazy(() => import('./../features/ProductCategory/pages/AddProductCategory'))
const ProductCategoryEdit = lazy(() => import('./../features/ProductCategory/pages/EditProductCategory'))


export const routes = [
  {
    path: '/',
    exact: false,
    title: 'Root',
    component: CleanLayout,
    child: [
      {
        path: '/login',
        title: 'Login',
        exact: true,
        component: Lazyload(Login)
      },
      {
        path: '/',
        title: 'DashboardLayout',
        exact: false,
        component: DashboardLayout,
        child: [
          {
            path: '/dashboard',
            title: 'Dashboard',
            exact: false,
            component: BasicLayout,
            child: [
              {
                path: '/dashboard',
                title: 'Dashboard',
                exact: true,
                component: Lazyload(DashboardHome)
              }
            ]
          },
          {
            path: '/product-category',
            title: 'Product Category',
            exact: false,
            component: BasicLayout,
            child: [
              {
                path: '/product-category',
                title: 'Product Category',
                exact: true,
                component: Lazyload(ProductCategoryList)
              },
              {
                path: '/product-category/add',
                title: 'Add Category',
                exact: true,
                component: Lazyload(ProductCategoryAdd)
              },
              {
                path: '/product-category/:id/edit',
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