'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Plus, Minus, ShoppingCart, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ReviewSection } from '@/components/review/review-section'

// 임시 데이터 - 나중에 실제 데이터베이스에서 가져올 예정
const getProductById = (id: string) => {
  // 실제로는 Prisma를 사용해서 데이터베이스에서 가져올 예정
  const products = {
    '1001234567890': {
      id: '1001234567890',
      name: 'iPhone 15 Pro Max',
      description: 'Apple의 최신 플래그십 스마트폰으로, 강력한 A17 Pro 칩셈과 Pro 카메라 시스템을 탑재했습니다.',
      price: 1590000,
      salePrice: 1490000,
      images: [
        '/placeholder-product.svg',
        '/placeholder-product.svg',
        '/placeholder-product.svg',
      ],
      status: 'ACTIVE',
      stock: 10,
      category: '전자제품',
      sku: 'IPHONE15PROMAX',
      rating: 4.5,
      reviewCount: 1234,
      specifications: {
        '화면 크기': '6.7인치',
        '운영체제': 'iOS 17',
        '저장용량': '256GB',
        '색상': '내추럴 티타늄',
        '배터리': '리틬이온',
        '무게': '221g'
      }
    }
  }
  
  return products[id as keyof typeof products] || null
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  
  const product = getProductById(params.slug) // slug를 id로 사용
  
  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>
  }

  const hasDiscount = product.salePrice && product.salePrice < product.price
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price)
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addToCart = () => {
    // 장바구니에 추가하는 로직 (나중에 전역 상태 사용)
    alert(`${product.name} ${quantity}개가 장바구니에 추가되었습니다!`)
  }

  const buyNow = () => {
    // 바로 구매 로직 (나중에 주문 페이지로 이동)
    alert(`${product.name} ${quantity}개를 바로 구매합니다!`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 이미지 섹션 */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage] || '/placeholder-product.svg'}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
                  selectedImage === index ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 상품 정보 섹션 */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* 평점 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount}개 리뷰)
              </span>
            </div>
          </div>

          {/* 가격 */}
          <div className="space-y-2">
            {hasDiscount ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-red-500">
                    {formatPrice(product.salePrice!)}
                  </span>
                  <Badge className="bg-red-500">-{discountPercentage}%</Badge>
                </div>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* 수량 선택 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-medium">수량:</span>
              <div className="flex items-center border rounded">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-gray-500">
                재고: {product.stock}개
              </span>
            </div>

            {/* 구매 버튼들 */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1" disabled={product.stock === 0} onClick={addToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                장바구니 담기
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <Button size="lg" variant="secondary" className="w-full" onClick={buyNow}>
              바로 구매하기
            </Button>
          </div>

          {/* 배송 정보 */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">배송 정보</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>• 무료배송 (5만원 이상 구매시)</p>
                <p>• 평일 오후 2시 이전 주문시 당일 발송</p>
                <p>• 제주도/도서산간 지역 추가 배송비</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 상품 상세 정보 탭 */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">상품 설명</TabsTrigger>
            <TabsTrigger value="specifications">상품 사양</TabsTrigger>
            <TabsTrigger value="reviews">리뷰 ({product.reviewCount})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">상품 상세 설명</h3>
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                  <p className="mt-4">
                    이 제품은 최신 기술과 혁신적인 디자인을 결합하여 만들어진 프리미엄 제품입니다.
                    뛰어난 성능과 사용자 경험을 제공하며, 일상생활에서 필요한 모든 기능을 갖추고 있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">제품 사양</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2">
                      <span className="font-medium text-gray-600">{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <ReviewSection />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
