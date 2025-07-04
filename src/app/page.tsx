import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/product/product-card'
import { ArrowRight, Truck, CreditCard, HeadphonesIcon } from 'lucide-react'
import { prisma } from '@/lib/prisma'

// 데이터베이스에서 데이터 가져오기
async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: {
      status: 'ACTIVE',
    },
    take: 4,
    orderBy: {
      createdAt: 'desc'
    }
  })
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    where: {
      isActive: true
    },
    include: {
      _count: {
        select: {
          products: true
        }
      }
    }
  })
  
  return categories.map(category => ({
    name: category.name,
    slug: category.slug,
    count: category._count.products
  }))
}

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories()
  ])
  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            SI Commerce에 오신 것을 환영합니다
          </h1>
          <p className="text-xl mb-8 opacity-90">
            최고의 상품을 최저가로 만나보세요
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              지금 쇼핑하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent">
              카테고리 보기
            </Button>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center flex-col text-center">
              <Truck className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">무료배송</h3>
              <p className="text-gray-600">5만원 이상 구매시 무료배송</p>
            </div>
            <div className="flex items-center justify-center flex-col text-center">
              <CreditCard className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">안전결제</h3>
              <p className="text-gray-600">다양한 결제 수단 지원</p>
            </div>
            <div className="flex items-center justify-center flex-col text-center">
              <HeadphonesIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">고객지원</h3>
              <p className="text-gray-600">24/7 고객 서비스</p>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">인기 카테고리</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <Badge variant="secondary">{category.count}개 상품</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 추천 상품 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">추천 상품</h2>
            <Link href="/products">
              <Button variant="outline">
                모든 상품 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 뉴스레터 섹션 */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">특별 혜택을 놓치지 마세요!</h2>
          <p className="text-xl mb-8 opacity-90">
            새로운 상품과 할인 정보를 가장 먼저 받아보세요
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="flex-1 px-4 py-2 rounded text-black"
            />
            <Button variant="secondary">
              구독하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
