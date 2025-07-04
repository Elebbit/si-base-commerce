'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/contexts/cart-context'

export default function CartPage() {
  const router = useRouter()
  const { items: cartItems, updateQuantity, removeItem, totalPrice } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price)
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: string) => {
    removeItem(productId)
  }

  const getItemTotal = (item: typeof cartItems[0]) => {
    return item.price * item.quantity
  }

  const subtotal = totalPrice
  const shipping = subtotal >= 50000 ? 0 : 3000
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">장바구니가 비어있습니다</h1>
          <p className="text-gray-600 mb-8">원하는 상품을 장바구니에 담아보세요!</p>
          <Link href="/">
            <Button size="lg">
              쇼핑 계속하기
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">장바구니</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 장바구니 아이템 목록 */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const hasDiscount = item.salePrice && item.salePrice < item.price
            const currentPrice = item.salePrice || item.price
            
            return (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* 상품 이미지 */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                    {/* 상품 정보 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium line-clamp-2">
                        {item.name}
                      </h3>
                      
                      <div className="mt-2">
                        <span className="font-bold">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* 수량 조절 */}
                        <div className="flex items-center border rounded">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-2 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* 삭제 버튼과 소계 */}
                        <div className="flex items-center gap-4">
                          <span className="font-bold">
                            {formatPrice(getItemTotal(item))}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.productId)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 주문 요약 */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>주문 요약</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>상품 금액</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>배송비</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">무료</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-gray-600">
                  {formatPrice(50000 - subtotal)} 더 담으면 무료배송!
                </p>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>총 결제금액</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="space-y-2">
                <Button size="lg" className="w-full" onClick={() => router.push('/order')}>
                  주문하기
                </Button>
                <Link href="/">
                  <Button variant="outline" size="lg" className="w-full">
                    쇼핑 계속하기
                  </Button>
                </Link>
              </div>

              {/* 혜택 정보 */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">혜택 정보</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• 5만원 이상 무료배송</p>
                  <p>• 신용카드 무이자 할부</p>
                  <p>• 적립금 1% 적립</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
