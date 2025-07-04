import { ProductPageClient } from './product-page-client'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

// 데이터베이스에서 상품 데이터 가져오기
async function getProductById(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      attributes: true
    }
  })

  if (!product) return null

  const { price, salePrice, weight, ...restOfProduct } = product;

  // 상품 데이터를 정리하여 반환
  return {
    ...restOfProduct,
    price: price.toNumber(),
    salePrice: salePrice ? salePrice.toNumber() : null,
    weight: weight ? weight.toNumber() : null,
    specifications: product.attributes.reduce((acc, attr) => {
      acc[attr.name] = attr.value
      return acc
    }, {} as Record<string, string>),
    rating: product.reviews.length > 0 
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0,
    reviewCount: product.reviews.length
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductById(params.slug)
  
  if (!product) {
    notFound()
  }

  return <ProductPageClient product={product} />
}
