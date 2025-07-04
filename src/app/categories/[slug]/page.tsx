import { CategoryPageClient } from './category-page-client'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

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

async function getCategoryData(slug: string): Promise<{ category: Category; products: Product[] } | null> {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: 'ACTIVE' },
          include: {
            reviews: true
          }
        }
      }
    })

    if (!category) {
      return null
    }

    const products: Product[] = category.products.map(product => {
      const reviews = product.reviews
      const rating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0
      
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: Number(product.price),
        salePrice: product.salePrice ? Number(product.salePrice) : null,
        images: product.images,
        stock: product.stock,
        status: product.status,
        rating,
        reviewCount: reviews.length
      }
    })

    return {
      category: {
        id: category.id,
        name: category.name,
        description: category.description,
        productCount: products.length
      },
      products,
          }
  } catch (error) {
    console.error('카테고리 데이터를 가져오는 중 오류 발생:', error)
    return null
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const data = await getCategoryData(params.slug)
  
  if (!data) {
    return notFound()
  }

  return (
    <CategoryPageClient 
      category={data.category}
      products={data.products}
      
    />
  )
}
