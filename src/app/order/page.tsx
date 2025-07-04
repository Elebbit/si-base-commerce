'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/contexts/cart-context'

interface OrderItem {
  id?: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

function OrderPageContent() {
  const { items: cartItems, clearCart } = useCart()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [isBuyNow, setIsBuyNow] = useState(false)

  useEffect(() => {
    const itemsQuery = searchParams.get('items')
    if (itemsQuery) {
      try {
        const parsedItems = JSON.parse(itemsQuery)
        setOrderItems(parsedItems)
        setIsBuyNow(true)
      } catch (error) {
        console.error("URL의 주문 상품 정보 파싱 실패:", error)
        setOrderItems(cartItems)
        setIsBuyNow(false)
      }
    } else {
      setOrderItems(cartItems)
      setIsBuyNow(false)
    }
  }, [searchParams, cartItems])

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    detailAddress: '',
    zipCode: '',
    paymentMethod: 'card',
    deliveryMessage: ''
  })

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 50000 ? 0 : 3000
  const total = subtotal + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price)
  }

  const handlePostcodeSearch = () => {
    // Daum 우편번호 서비스 사용
    if (typeof window !== 'undefined' && (window as any).daum) {
      new (window as any).daum.Postcode({
        oncomplete: function(data: any) {
          setFormData(prev => ({
            ...prev,
            zipCode: data.zonecode,
            address: data.address
          }))
        }
      }).open()
    } else {
      alert('우편번호 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderItems.length === 0) {
      alert('주문할 상품이 없습니다.')
      return
    }
    // TODO: 실제 주문 처리 로직과 결제 API 연동
    console.log('주문 데이터:', {
      ...formData,
      items: orderItems,
      total,
    })
    alert('주문이 완료되었습니다!')
    
    if (!isBuyNow) {
      clearCart()
    }
    router.push('/') // 주문 완료 후 홈으로 이동
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">주문하기</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 주문 정보 입력 */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 주문자 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>주문자 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">이름</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">휴대폰 번호</label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">이메일</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="example@email.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 배송 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>배송 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">우편번호</label>
                  <div className="flex gap-2">
                    <Input
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                      placeholder="12345"
                    />
                    <Button type="button" variant="outline" onClick={handlePostcodeSearch}>우편번호 찾기</Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">주소</label>
                  <Input
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="서울특별시 강남구 테헤란로 123"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">상세주소</label>
                  <Input
                    value={formData.detailAddress}
                    onChange={(e) => setFormData({...formData, detailAddress: e.target.value})}
                    placeholder="SI타워 10층"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">배송 메시지</label>
                  <Textarea
                    value={formData.deliveryMessage}
                    onChange={(e) => setFormData({...formData, deliveryMessage: e.target.value})}
                    placeholder="배송 시 요청사항을 입력하세요"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 결제 방법 */}
            <Card>
              <CardHeader>
                <CardTitle>결제 방법</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    />
                    <span>신용카드</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    />
                    <span>계좌이체</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment"
                      value="kakaopay"
                      checked={formData.paymentMethod === 'kakaopay'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    />
                    <span>카카오페이</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* 주문 요약 */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>주문 상품</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.length > 0 ? orderItems.map((item) => (
                <div key={item.id || item.productId} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-600">수량: {item.quantity}</span>
                      <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center text-gray-500 py-4">
                  주문할 상품이 없습니다.
                </div>
              )}

              <Separator />

              <div className="space-y-2">
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
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>총 결제금액</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                onClick={handleSubmit}
              >
                {formatPrice(total)} 결제하기
              </Button>

              {/* 주문 정보 동의 */}
              <div className="text-xs text-gray-600 space-y-1">
                <label className="flex items-start space-x-2">
                  <input type="checkbox" required className="mt-1" />
                  <span>주문 내용을 확인했으며, 정보 제공 등에 동의합니다.</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">주문 정보를 불러오는 중입니다...</div>}>
      <OrderPageContent />
    </Suspense>
  )
}
