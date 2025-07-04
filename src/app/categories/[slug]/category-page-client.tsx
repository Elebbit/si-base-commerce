'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Filter, SortAsc } from 'lucide-react'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  salePrice: number | null
  images: string[]
  stock: number
  status: string
  rating: number
  reviewCount: number
}

interface Category {
  id: string
  name: string
  description: string | null
  productCount: number
}

interface CategoryPageClientProps {
  category: Category
  products: Product[]
}

type SortOption = 'recommended' | 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating'

export function CategoryPageClient({ category, products }: CategoryPageClientProps) {

  const [priceRange, setPriceRange] = useState<string>('')
  const [minRating, setMinRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState<SortOption>('recommended')

  // 필터된 상품 목록
  const filteredProducts = useMemo(() => {
    let filtered = products

    // 가격 필터
    if (priceRange) {
      filtered = filtered.filter(product => {
        const price = product.salePrice || product.price
        switch (priceRange) {
          case 'under-500000':
            return price < 500000
          case '500000-1000000':
            return price >= 500000 && price < 1000000
          case '1000000-2000000':
            return price >= 1000000 && price < 2000000
          case 'over-2000000':
            return price >= 2000000
          default:
            return true
        }
      })
    }

    // 평점 필터
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating)
    }

    return filtered
  }, [products, priceRange, minRating])

  // 정렬된 상품 목록
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
      case 'price-high':
        return sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'popular':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
      case 'newest':
        // 임시로 이름순으로 정렬 (실제로는 생성일 기준이어야 함)
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  const resetFilters = () => {

    setPriceRange('')
    setMinRating(0)
  }

  const priceRanges = [
    { value: 'under-500000', label: '50만원 이하' },
    { value: '500000-1000000', label: '50만원 - 100만원' },
    { value: '1000000-2000000', label: '100만원 - 200만원' },
    { value: 'over-2000000', label: '200만원 이상' }
  ]

  const ratingOptions = [
    { value: 4, label: '4점 이상' },
    { value: 3, label: '3점 이상' },
    { value: 2, label: '2점 이상' }
  ]

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
                {/* 가격 필터 */}
                <div>
                  <h4 className="font-medium mb-3">가격</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.value} className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="priceRange"
                          value={range.value}
                          checked={priceRange === range.value}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="rounded" 
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 평점 필터 */}
                <div>
                  <h4 className="font-medium mb-3">평점</h4>
                  <div className="space-y-2">
                    {ratingOptions.map((option) => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          name="rating"
                          value={option.value}
                          checked={minRating === option.value}
                          onChange={(e) => setMinRating(Number(e.target.value))}
                          className="rounded" 
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-6" onClick={resetFilters}>
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
              총 {sortedProducts.length}개 상품
            </p>
            
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4" />
              <select 
                className="border rounded px-3 py-1 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="recommended">추천순</option>
                <option value="popular">인기순</option>
                <option value="newest">최신순</option>
                <option value="price-low">낮은 가격순</option>
                <option value="price-high">높은 가격순</option>
                <option value="rating">평점순</option>
              </select>
            </div>
          </div>

          {/* 상품 그리드 */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">조건에 맞는 상품이 없습니다.</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                필터 초기화
              </Button>
            </div>
          )}

          {/* 페이지네이션 */}
          {sortedProducts.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  )
}
