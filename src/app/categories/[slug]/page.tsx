import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Filter, SortAsc } from 'lucide-react'

// 임시 데이터 - 실제로는 DB에서 가져올 예정
const getCategoryBySlug = (slug: string) => {
  const categories = {
    electronics: {
      name: '전자제품',
      description: '최신 전자제품과 디지털 기기를 만나보세요.',
      productCount: 156
    },
    fashion: {
      name: '패션',
      description: '트렌디한 의류와 악세서리를 둘러보세요.',
      productCount: 234
    },
    home: {
      name: '홈 & 리빙',
      description: '집을 더욱 아름답게 만들어줄 홈 인테리어 제품들.',
      productCount: 89
    },
    books: {
      name: '도서',
      description: '다양한 장르의 도서를 만나보세요.',
      productCount: 567
    }
  }
  
  return categories[slug as keyof typeof categories] || null
}

const getProductsByCategory = (slug: string) => {
  // 실제로는 DB에서 해당 카테고리의 상품들을 가져올 예정
  const products = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      slug: 'iphone-15-pro-max',
      price: 1590000,
      salePrice: 1490000,
      images: ['/placeholder-product.svg'],
      status: 'ACTIVE',
      stock: 10
    },
    {
      id: '2',
      name: 'MacBook Pro 14인치',
      slug: 'macbook-pro-14',
      price: 2690000,
      images: ['/placeholder-product.svg'],
      status: 'ACTIVE',
      stock: 5
    },
    {
      id: '3',
      name: 'AirPods Pro 2세대',
      slug: 'airpods-pro-2',
      price: 359000,
      salePrice: 299000,
      images: ['/placeholder-product.svg'],
      status: 'ACTIVE',
      stock: 0
    },
    {
      id: '4',
      name: 'iPad Air 5세대',
      slug: 'ipad-air-5',
      price: 929000,
      images: ['/placeholder-product.svg'],
      status: 'ACTIVE',
      stock: 15
    },
    {
      id: '5',
      name: 'Apple Watch Series 9',
      slug: 'apple-watch-series-9',
      price: 599000,
      salePrice: 549000,
      images: ['/placeholder-product.svg'],
      status: 'ACTIVE',
      stock: 8
    },
    {
      id: '6',
      name: 'MacBook Air M3',
      slug: 'macbook-air-m3',
      price: 1590000,
      images: ['/placeholder-product.svg'],
      status: 'ACTIVE',
      stock: 12
    }
  ]
  
  return products
}

const filters = [
  {
    name: '가격',
    options: [
      '50만원 이하',
      '50만원 - 100만원',
      '100만원 - 200만원',
      '200만원 이상'
    ]
  },
  {
    name: '브랜드',
    options: ['Apple', 'Samsung', 'LG', 'Sony', 'Microsoft']
  },
  {
    name: '평점',
    options: ['4점 이상', '3점 이상', '2점 이상']
  }
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)
  const products = getProductsByCategory(params.slug)
  
  if (!category) {
    return <div>카테고리를 찾을 수 없습니다.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 카테고리 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600 mb-4">{category.description}</p>
        <Badge variant="secondary">{category.productCount}개 상품</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 필터 사이드바 */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4" />
                <h3 className="font-semibold">필터</h3>
              </div>
              
              <div className="space-y-6">
                {filters.map((filter) => (
                  <div key={filter.name}>
                    <h4 className="font-medium mb-3">{filter.name}</h4>
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6">
                필터 초기화
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 상품 목록 */}
        <div className="lg:col-span-3">
          {/* 정렬 옵션 */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              총 {products.length}개 상품
            </p>
            
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4" />
              <select className="border rounded px-3 py-1 text-sm">
                <option>추천순</option>
                <option>인기순</option>
                <option>최신순</option>
                <option>낮은 가격순</option>
                <option>높은 가격순</option>
                <option>평점순</option>
              </select>
            </div>
          </div>

          {/* 상품 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                이전
              </Button>
              <Button variant="default" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">
                다음
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
