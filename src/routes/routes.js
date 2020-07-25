import {lazy} from 'react'

import {Lazyload} from './../HOC'

import {
  Clean as CleanLayout,
  Dashboard as DashboardLayout,
  Basic as BasicLayout
} from './../layouts'

const Login = lazy(() => import('./../features/Login'))
const Dashboard = lazy(() => import('./../features/Dashboard'))

const ProductCategoryList = lazy(() => import('./../features/ProductCategory/pages/ProductCategoryList'))
const ProductCategoryAdd = lazy(() => import('./../features/ProductCategory/pages/ProductCategoryList'))
const ProductCategoryEdit = lazy(() => import('./../features/ProductCategory/pages/ProductCategoryList'))


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
        path: '/dashboard',
        title: 'DashboardLayout',
        exact: false,
        component: DashboardLayout,
        child: [
          {
            path: '/dashboard/home',
            title: 'Dashboard',
            exact: true,
            component: Lazyload(Dashboard),
          },
          {
            path: '/dashboard/product-category',
            title: 'Product Category',
            exact: false,
            component: BasicLayout,
            child: [
              {
                path: '/dashboard/product-category',
                title: 'Product Category',
                exact: true,
                component: Lazyload(ProductCategoryList)
              },
              {
                path: '/dashboard/product-category/add',
                title: 'Add New Product Category',
                exact: true,
                component: Lazyload(ProductCategoryAdd)
              },
              {
                path: '/dashboard/product-category/:id/edit',
                title: 'Edit Product Category',
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