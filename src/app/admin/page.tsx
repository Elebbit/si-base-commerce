'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Users, Package, ShoppingCart, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react'

export default function AdminPage() {
  // 임시 통계 데이터
  const stats = {
    totalUsers: 1234,
    totalProducts: 567,
    totalOrders: 890,
    totalRevenue: 12345678
  }

  // 임시 상품 데이터
  const products = [
    {
      id: '1001234567890',
      name: 'iPhone 15 Pro Max',
      category: '전자제품',
      price: 1590000,
      stock: 10,
      status: 'ACTIVE'
    },
    {
      id: '1001234567891',
      name: 'MacBook Pro 14인치',
      category: '전자제품',
      price: 2690000,
      stock: 5,
      status: 'ACTIVE'
    }
  ]

  // 임시 주문 데이터
  const orders = [
    {
      id: 'ORD-001',
      customer: '홍길동',
      date: '2025-07-04',
      total: 1590000,
      status: 'PENDING'
    },
    {
      id: 'ORD-002',
      customer: '김철수',
      date: '2025-07-03',
      total: 2690000,
      status: 'SHIPPED'
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      ACTIVE: { label: '활성', variant: 'default' as const },
      INACTIVE: { label: '비활성', variant: 'secondary' as const },
      PENDING: { label: '대기중', variant: 'secondary' as const },
      SHIPPED: { label: '배송중', variant: 'default' as const },
      DELIVERED: { label: '배송완료', variant: 'default' as const }
    }
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, variant: 'secondary' as const }
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">관리자 대시보드</h1>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 회원 수</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 상품 수</p>
                <p className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 주문 수</p>
                <p className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 매출</p>
                <p className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 관리 탭 */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">상품 관리</TabsTrigger>
          <TabsTrigger value="orders">주문 관리</TabsTrigger>
          <TabsTrigger value="users">회원 관리</TabsTrigger>
        </TabsList>

        {/* 상품 관리 */}
        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>상품 목록</CardTitle>
                <Button>새 상품 추가</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">상품 ID</th>
                      <th className="text-left py-3 px-4">상품명</th>
                      <th className="text-left py-3 px-4">카테고리</th>
                      <th className="text-left py-3 px-4">가격</th>
                      <th className="text-left py-3 px-4">재고</th>
                      <th className="text-left py-3 px-4">상태</th>
                      <th className="text-left py-3 px-4">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-3 px-4">{product.id}</td>
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4">{product.category}</td>
                        <td className="py-3 px-4">{formatPrice(product.price)}</td>
                        <td className="py-3 px-4">{product.stock}</td>
                        <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 주문 관리 */}
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>주문 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">주문 번호</th>
                      <th className="text-left py-3 px-4">고객명</th>
                      <th className="text-left py-3 px-4">주문일</th>
                      <th className="text-left py-3 px-4">주문 금액</th>
                      <th className="text-left py-3 px-4">상태</th>
                      <th className="text-left py-3 px-4">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{order.id}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">{formatPrice(order.total)}</td>
                        <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm">
                              상태 변경
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 회원 관리 */}
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>회원 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">회원 관리 기능은 준비 중입니다.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
